import React, { useState } from 'react';
import styled from 'styled-components';
import SideLeftCreateRoom1 from './SideLeftCreateRoom1';
import SideLeftCreateRoom4 from './SideLeftCreateRoom4';

const Wrapper = styled.div`
    position: fixed; /* 화면에 고정 */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999; /* 컨텐츠보다 위에 표시 */
`;
const Container = styled.div`
    text-align: center;
    overflow-wrap: break-word;
    border: 1px solid black;
    width: 600px;
    padding: 30px;
    margin: 0 auto;
    position: relative;
    background-color: #F5F7F8;
    z-index: 1000;
        
    `
const Header = styled.header`
    width: 90%;
    text-align: center;
    margin: 0 auto;
    `

const Body = styled.div`
        
    `
const H1 = styled.h1`
    `

const Button = styled.button`
        
    `
const Section = styled.section`
        
    `
const Div = styled.div`
    margin: 10px;
    `

const Footer = styled.div`
    
`

function SideLeftCreateRoom3({create3,setCreate3,create1}) {


   

    const goBack = () => {
        setCreate3(false);
        create1(true);
    }

    return (
        <>
        <Wrapper style={create3 === true ? {display : 'flex'} : {display : 'none'}}>
        <Container>
            <Header>
                <H1>방 참가하기</H1>
                <p>아래에 초대코드를 입력하여 방에 참가하세요.</p>
            </Header>
            <Body>
                <p>초대 코드</p>
                <input type="text" placeholder='초대코드를 입력하세요' />
                <p>초대는 다음 형태여야 해요.</p>
                <p>ex dkEKdmQ</p>
            </Body>
            <Footer>
                <Div>
                    <Section>
                        <Button onClick={goBack}>뒤로가기</Button>
                    </Section>
                    <Section>
                        <Button>방 들어가기</Button>
                    </Section>
                </Div>
            </Footer>

        </Container>
        </Wrapper>

        </>
    );
}

export default SideLeftCreateRoom3;