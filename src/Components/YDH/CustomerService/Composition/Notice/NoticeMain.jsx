import React from 'react';
import styled from 'styled-components';
import ServiceSearch from '../../ServiceSearch';
import NoticePost from './NoticePost';

const Area = styled.div`

`;

function NoticeMain(props) {
    return (
        <Area>
            <ServiceSearch/>
            <NoticePost/>
        </Area>
    );
}

export default NoticeMain;