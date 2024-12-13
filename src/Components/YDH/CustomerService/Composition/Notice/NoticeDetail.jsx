import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NoticeSearch from '../../ServiceSearch';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// 스타일 컴포넌트로 이미지 크기 설정
const Area = styled.div`
  img {
    max-width: 200px;
    max-height: 200px;
    margin: 10px 0;
  }
`;

function NoticeDetail(props) {
    // 페이지 이동을 위한 navigate 함수 사용
    const nav = useNavigate();
    // URL에서 'idx' (게시글 번호)를 가져오기
    const { idx } = useParams(); 
    // 게시글 상세 데이터를 저장할 상태
    const [notice, setNotice] = useState({}); 
    // 첨부파일 리스트 데이터를 저장할 상태
    const [attachments, setAttachments] = useState([]); 

    // 게시글 상세 데이터를 가져오는 함수
    const getNoticeList = async () => {
        try {
            const resp = await axios.get(`/service/notice/${idx}`);
            const data = resp.data;
            setNotice(data); // 응답 데이터를 notice 상태에 저장
        } catch (error) {
            console.error("게시판 상세 에러 발생:", error); // 에러 처리
        }
    };

    // 첨부파일 리스트를 가져오는 함수
    const getAttachList = async () => {
        try {
            const resp = await axios.get(`/getAttachList/${idx}`);
            const data = resp.data;
            setAttachments(data); // 응답 데이터를 attachments 상태에 저장
        } catch (error) {
            console.error("첨부파일 리스트 가져오기 에러 발생:", error); // 에러 처리
        }
    };

    // 컴포넌트가 처음 렌더링될 때, 게시글 및 첨부파일 데이터를 가져오기
    useEffect(() => {
        getNoticeList();
        getAttachList();
    }, []); // 빈 배열을 넣어 한번만 실행되도록 설정

    // 수정 페이지로 이동하는 함수
    const moveToNoticeModify = () => {
        nav('/service/notice/modify/' + idx); // 해당 게시글의 idx로 수정 페이지 이동
    };

    // 목록 페이지로 이동하는 함수
    const moveToNoticeList = () => {
        nav('/service/notice/'); // 공지사항 목록 페이지로 이동
    };

    // 날짜 포맷을 'YYYY/MM/DD' 형식으로 변환하는 함수
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`; // 'YYYY/MM/DD' 형식으로 반환
    };

    // 첨부파일을 렌더링하는 함수
    const renderAttachment = (file) => {
        // 이미지 파일 확장자 배열
        const imageExtensions = ['png', 'jpg', 'jpeg', 'gif'];
        const extension = file.uploadName.split('.').pop().toLowerCase(); // 파일 확장자 추출
        const basePath = '/img'; // 파일 경로 (서버 경로로 변경해야 함)
        const fileUrl = `${basePath}/${file.uploadPath}/${file.uploadName}`; // 최종 파일 경로 생성

        // 이미지 파일이면 <img> 태그로 렌더링, 아니면 <a> 태그로 링크 표시
        if (imageExtensions.includes(extension)) {
            return <img src={fileUrl} alt={file.uploadName} />; // 이미지 파일 렌더링
        } else {
            return (
                <a href={fileUrl} target="_blank" rel="noopener noreferrer"> 
                {file.uploadName} {/* 이미지가 아니면 링크로 표시 */} </a> 
                // target="_blank" : 링크를 클릭할 때 해당 링크가 새 탭에서 열리도록 지정
                //
            );
        }
    };

    return (
        <Area>
            {/* 검색 컴포넌트 */}
            <NoticeSearch />
            <div>
                {/* notice 상태에 데이터가 있을 경우 */}
                {notice ? (
                    <div>
                        {/* 게시글 내용을 테이블로 표시 */}
                        <table>
                            <tbody>
                                <tr>
                                    <td>{notice.title}</td> {/* 제목 */}
                                </tr>
                                <tr>
                                    <td>{notice.writer}</td> {/* 작성자 */}
                                </tr>
                                <tr>
                                    <td>
                                        {/* 날짜 및 수정일 표시 */}
                                        날짜 : {notice.regDate ? formatDate(notice.regDate) : 'N/A'} |
                                        마지막 수정일 : {notice.updateDate ? formatDate(notice.updateDate) : 'N/A'}
                                    </td>
                                </tr>
                                <tr>
                                    <td>{notice.content}</td> {/* 내용 */}
                                </tr>
                            </tbody>
                        </table>
                        {/* 첨부파일이 있을 경우 렌더링 */}
                        <div>
                            {attachments && attachments.length > 0 ? (
                                attachments.map((file, index) => (
                                    <div key={index}>{renderAttachment(file)}</div> // 각 파일마다 첨부파일 렌더링
                                ))
                            ) : null}
                        </div>
                    </div>
                ) : (
                    <p>로딩 중입니다...</p> // 데이터 로딩 중일 때 표시할 메시지
                )}
                {/* 수정 및 목록 페이지로 이동하는 버튼 */}
                <div>
                    <button onClick={moveToNoticeModify}>수정</button>
                    <button onClick={moveToNoticeList}>목록</button>
                </div>
            </div>
        </Area>
    );
}

export default NoticeDetail;
