import React, { useState } from 'react';
import styled from 'styled-components';
import SideLeftCreateRoom3 from './SideLeftCreateRoom3';
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
    padding: 30px;
    margin: 0 auto;
    width: 600px;
    overflow-y:auto;
    height: 400px;
    position: relative;
    background-color: #F5F7F8;
    z-index: 1000;
        
    `
const Header = styled.header`
    width: 90%;
    text-align: center;
    margin: 0 auto;
    `
const H3 = styled.h3`
    `

const Body = styled.div`
        
    `
const Button = styled.button`
        
    `
const Section = styled.section`
        
    `
const Div = styled.div`
    margin: 10px;
    `

const Img = styled.img`
    width:100px;
    height: 100px;
    object-fit: cover;

`
const Span = styled.span`
        color: #aaa;
	    font-size: 28px;
	    font-weight: bold;
	    cursor: pointer;
        transition: color 0.3s ease;
        position: absolute; /* 절대 위치로 설정 */
        top: 5px; /* 상단에서 10px */
        right: 10px;
`

const Footer = styled.button`
    padding: 0px;
    border: none;
`


function SideLeftCreateRoom2({data, create2,setCreate2, create1,category}) {
    
    const[creatRoom4, setCreateRoom4] = useState(false); 
    
    const handleModalClose = () => {
        setCreate2(false);
    }

    const handleDetailClick = () => {
        setCreate2(false);
        setCreateRoom4(true);
    }   

    const goBack = () => {
        setCreate2(false);
        create1(true);
    }


    return (
        <>
        <Wrapper style={create2 === true ? {display : 'flex'} : {display : 'none'}}>
            <Container>
                <Header>
                    <Span onClick={handleModalClose}>&times;</Span>
                    <H3>이 방에 대해 더 자세히 설명해주세요</H3>
                    <p>설정을 돕고자 질문을 드려요. 혹시 개설하는 방이 친구 몇 명만을 위한 방인가요, 아니면 더 큰 커뮤니티를 위한 방인가요? </p>
                </Header>
                <Body>
                    <Div>
                        <Button onClick={handleDetailClick}>
                            <Section><Img src="\images\yoon\club.webp" alt="club" /></Section>
                            <Section>클럽, 혹은 커뮤니티용 방</Section>
                        </Button>
                    </Div>
                    <Div>
                        <Button>
                            <Section><Img src="\images\yoon\meAndFriend.webp" alt="meAndFriend" /></Section>
                            <Section>나와 친구들을 위한 방</Section>
                        </Button>
                    </Div>
                </Body>
                <Footer>
                    <Button onClick={goBack}>뒤로가기</Button>
                </Footer>

            </Container>
        </Wrapper>
        <SideLeftCreateRoom4 create4={creatRoom4} setCreate4={setCreateRoom4} data={data} create2={setCreate2} category={category} />      

        </>
    );
}

export default SideLeftCreateRoom2;