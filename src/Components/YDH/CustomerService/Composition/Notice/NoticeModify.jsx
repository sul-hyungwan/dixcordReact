import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ServiceSearch from '../../ServiceSearch';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Area = styled.div`

`;

function NoticeModify(props) {
    const nav = useNavigate();
    const { idx } = useParams(); // URL 파라미터에서 글 번호를 가져옴
    console.log("idx " + idx);
    const [notice, setNotice] = useState({
        idx: '',
        title: '',
        writer: '',
        content: ''
    });

    // 기존 게시글 데이터 불러오기
    const fetchNoticeDetail = async () => {
        try {
            const resp = await axios.get(`/service/notice/${idx}`);
            const data = resp.data;
            setNotice(data);
            console.log("기존 게시글 데이터 " + {data})
        } catch (error) {
            console.error('게시글 불러오기 에러:', error);
        }
    };

    useEffect(() => {
        fetchNoticeDetail();
    }, []);

    // 입력 값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNotice({ ...notice, [name]: value });
    };

    // 수정 버튼 클릭 시 서버로 전송
    const noticeModify = async () => {
        try {
            await axios.post(`/service/notice/modify/${idx}`, notice); // POST 요청으로 수정 데이터 전송
            alert('게시글이 수정되었습니다.');
            nav(`/service/notice/${idx}`); // 수정 후 상세 페이지로 이동
        } catch (error) {
            console.error('게시글 수정 에러:', error);
            alert('수정 중 문제가 발생했습니다.');
        }
    };

    // 삭제 버튼
    const noticeDelete = async () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            try {
                await axios.get(`/noticeDelete/${idx}`, notice);
                alert("게시글이 삭제되었습니다.");
                nav("/service/notice"); // 게시글 목록 페이지로 이동
            } catch (error) {
                console.error("게시글 삭제 에러:", error);
                alert("삭제 중 문제가 발생했습니다.");
            }
        }
    };

    const moveToNoticeDetail  = () => {
        nav('/service/notice/' + idx);
    };
    return (
        <Area>
            <ServiceSearch/>
            <div>
                <div>
                <table>
                    <tbody>
                        <tr>
                            <td><input type="text" name="title" value={notice.title} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td>{notice.writer}</td>
                        </tr>
                        <tr>
                            <td>
                                <textarea
                                    rows="10"
                                    cols="76"
                                    name="content"
                                    value={notice.content}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={noticeModify}>수정 완료</button>
                <button onClick={noticeDelete}>삭제</button>
                <button onClick={moveToNoticeDetail}>취소</button> {/* 이전 페이지로 돌아가기 */}
            </div>
            </div>
        </Area>
    );
}

export default NoticeModify;