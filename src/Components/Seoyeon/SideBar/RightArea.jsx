import React from 'react';
import styled from 'styled-components';
import BodyDiv from './BodyDiv'; 
import FooterDiv from './FooterDiv';  

const RightAreaWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
`;

function RightArea({ friendList, openModal }) {
    return (
        <RightAreaWrapper>
            <BodyDiv friendList={friendList} openModal={openModal} />
            <FooterDiv friendList={friendList} />
        </RightAreaWrapper>
    );
}

export default RightArea;
