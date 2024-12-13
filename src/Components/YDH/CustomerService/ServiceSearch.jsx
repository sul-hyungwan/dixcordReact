import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

function ServiceSearch() {
    const location = useLocation();
    const { idx } = useParams();

    const renderHeader = () => {
        if (location.pathname === '/service/notice') {
            return "고객센터 > 공지사항";
        } else if (location.pathname === '/service/notice/write') {
            return "고객센터 > 공지사항 > 공지글 > 관리자 공지글 작성";
        } else if (location.pathname.startsWith('/service/notice/modify/') && idx) {
            return "고객센터 > 공지사항 > 공지글 > 관리자 수정";
        } else if (location.pathname.startsWith('/service/notice/') && idx) {
            return `고객센터 > 공지사항 > 공지글`;
        }

        if (location.pathname === '/service/qna') {
            return "고객센터 > Q & A";
        }
        // return "고객센터";
    };

    return (
        <div>
            <div>
                <a>{renderHeader()}</a>
                <input type="text" id='search' placeholder="검색" />
            </div>
        </div>
    );
}

export default ServiceSearch;
