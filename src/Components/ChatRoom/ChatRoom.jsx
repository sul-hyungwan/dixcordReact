import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
 height: 100%;
 border: 1px solid black;
 flex-direction: column;
 box-sizing: border-box;
 margin: 0;
 display: inline-block;
 overflow: hidden;
 position: static;
 z-index: 1000;
`;

const HeaderArea = styled.div`
    width: 80%;
    height: 60%;
    border: 1px solid black;

`

const BodyArea = styled.div`
    width: 80%;
    height: 30%;
    border: 1px solid black;
  
`

const FooterArea = styled.div`
    width: 80%;
    height: 9.7%;
    border: 1px solid black;
`





function ChatRoom(props) {

    

    return (
        <Container>
            <HeaderArea>
                <div>
                    채팅방 헤더(호연씨)
                </div>
            </HeaderArea>
            <BodyArea>
                <div>
                나와 상대방 채팅(호연씨)
                </div>
            </BodyArea>
            <FooterArea>
            <div>
                채팅 입력 input창(호연씨)
            </div>
            </FooterArea> 
        </Container>
    );
}

export default ChatRoom;