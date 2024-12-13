import React from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerServiceHelp(props) {
    const nav = useNavigate();
    const moveNoticePage = () => {
        nav('/service/notice')
    }
    const moveStartPage = () => {
        nav('/service/startpage')
    }
    const MyQuestionPage = () => {
        nav('/service/myquestion')
    }
    const moveQnAPage = () => {
        nav('/service/qna')
    }
    return (
        <div>
            <br /><br />
            계정 설정부터 승인까지 DIXCODE와 관련된 모든것을 문의하세요.<br/>
            DIXCODE를 시작한 지 얼마 안 되어 팁을 찾고 계신가요? 
            <br/>
            <button onClick={moveNoticePage}>공지사항</button>
            <button onClick={moveStartPage}>시작하기</button>
            <button onClick={moveQnAPage}>자주 묻는 질문</button><br/>
            <button onClick={MyQuestionPage}>내 문의</button>
            <button onClick={moveNoticePage}>서버 설정</button>
            <button onClick={moveNoticePage}>신뢰 및 보안</button>
        </div>
    );
}

export default CustomerServiceHelp;