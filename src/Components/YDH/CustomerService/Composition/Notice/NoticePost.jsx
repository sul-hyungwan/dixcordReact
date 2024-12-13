import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';



const NoticePost = () => {
    const nav = useNavigate();
    // 게시글 데이터를 관리할 상태 변수
    const [noticeList, setNoticeList] = useState([]);

    // 게시글 데이터를 서버에서 가져오는 함수
    const getNoticeList = async () => {
        try {
            // 2. 게시글 목록 데이터 받아오기
            const resp = await axios.get('/noticeList');
            const data = resp.data; // 응답에서 데이터 추출

            console.log("받아온 데이터" + data);

            // 3. 게시글 목록 데이터 상태값(state)에 할당
            setNoticeList(data); // 가져온 데이터를 상태에 저장
        } catch (error) {
            // 데이터 요청 중 에러 발생 시 콘솔에 출력
            console.error("게시판 리스트 에러 발생:", error);
        }
    };

    // 컴포넌트가 처음 렌더링될 때 실행되는 효과 훅
    // `getNoticeList`를 호출하여 게시글 데이터를 가져옴
    useEffect(() => {
        getNoticeList(); // 1. 게시글 목록 조회 함수 호출
    }, []);

    const moveWritePage = () => {
        nav('/service/notice/write')
    }

    // 날짜 포맷 변환 함수
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    formatDate(202020215156);

    return (
        <div>
            <div>
                <h1>공지사항</h1>
            </div>
            <div>
                {/* 관리자만 보임 */}
                <button onClick={moveWritePage}>공지글 등록</button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            {/* 테이블 헤더 */}
                            <th>제목</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 게시글 데이터를 순회하며 테이블 행 생성 */}
                        {noticeList.length > 0 ? (
                            noticeList.map((notice, index) => (
                                <tr key={index}>
                                    <td>
                                        <Link to={`/service/notice/${notice.idx}`} key={notice.idx}>{notice.title}</Link>
                                    </td>
                                    <td>{notice.regDate ? formatDate(notice.regDate) : 'N/A'}</td>
                                </tr>
                            ))
                        ) : (
                            // 게시글이 없을 경우 표시할 내용
                            <tr>
                                <td colSpan="4">게시글이 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NoticePost;