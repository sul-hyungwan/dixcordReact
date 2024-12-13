import React, { useState } from 'react';
import styled from 'styled-components';
import Display from '../Display/Display';
import SideLeftCreateRoom2 from './SideLeftCreateRoom2';
import SideLeftCreateRoom3 from './SideLeftCreateRoom3';


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
        border: 1px solid black;
        padding: 20px;
        margin: auto;
        width: 400px;
        overflow-y:auto;
        height: 400px;
        position: relative;
        background-color: #F5F7F8;
        z-index: 1000;

    `
const Header = styled.div`
        
    `
const H1 = styled.h1`
        
    `
const Body = styled.div`
        padding: 10px;
    `
const Div = styled.div`
        
    `
const Button = styled.button`
        
     
    `
const Section = styled.section`
    
    `
const Footer = styled.footer`
        
    `
const Image = styled.img`
        width: 80px; /* 원하는 너비 */
        height: 80px; /* 원하는 높이 */
        object-fit: cover; /* 이미지 비율 유지 */
  `;

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


function SideLeftCreateRoom1({data, create, create1,goBack}) {


    const[creatRoom2, setCreateRoom2] = useState(false);

    const[creatRoom3, setCreateRoom3] = useState(false); 

    const[category, setCategory] = useState('');


    const handleModalClose = () => {
        create1(false); 
    }
    
    const selectCategory = (e) => {
       
        if (!e.currentTarget.name) {
            alert('카테고리를 선택해주세요!');

            return;
        }else{
            create1(false);
            setCategory(e.currentTarget.name);
            setCreateRoom2(true);
        }

    }

    const isInvited = () => {
        create1(false);
        setCreateRoom3(true);
    }
 


    return (
        <>
        <Wrapper style={create === true ? {display : 'flex'} : {display : 'none'} && goBack === true ? {display:'flex'} :{display:'none'}}>
            <Container>
                <Header>
                    <Span onClick={handleModalClose}>&times;</Span>
                    <H1>방을 만들어보세요</H1>
                    <p>나와 친구들이 함께 어울리는 공간입니다. 내 채널을 만들고 대화를 시작해 보세요!</p>
                </Header>
                <Body>
                    <p>카테고리 선택하기</p>
                    <Div>
                        <Button name='게임' onClick={selectCategory}>
                            <Section><Image src="\images\yoon\game.webp" alt="Game" /></Section>

                            <Section>게임</Section>
                        </Button>
                    </Div>
                    <Div>
                        <Button name='음악' onClick={selectCategory}>
                            <Section><Image src="\images\yoon\music.webp" alt="Music" /></Section>

                            <Section>음악</Section>
                        </Button>
                    </Div>
                    <Div>
                        <Button name='프로젝트' onClick={selectCategory}>
                            <Section><Image src="\images\yoon\project.webp" alt="Project" /></Section>

                            <Section>프로젝트</Section>
                        </Button>
                    </Div>
                    <Div>
                        <Button name='교육' onClick={selectCategory}>
                            <Section><Image src="\images\yoon\education.webp" alt="Education" /></Section>

                            <Section>교육</Section>
                        </Button>
                    </Div>
                    <Div>
                        <Button name='엔터테인먼트' onClick={selectCategory}>
                            <Section><Image src="\images\yoon\entertainment.webp" alt="Entertainment" /></Section>

                            <Section>엔터테인먼트</Section>
                        </Button>
                    </Div>
                    <Div>
                        <Button name='음식' onClick={selectCategory}>
                            <Section><Image src="\images\yoon\food.webp" alt="Food" /></Section>

                            <Section>음식</Section>
                        </Button>
                    </Div>
                    <Div>
                        <Button name='여행' onClick={selectCategory}>
                            <Section><Image src="\images\yoon\trip.webp" alt="Trip" /></Section>

                            <Section>여행</Section>
                        </Button>
                    </Div>
                    <Div>
                        <Button name='경제' onClick={selectCategory}>
                            <Section><Image src="\images\yoon\economy.webp" alt="Economy" /></Section>

                            <Section>경제</Section>
                        </Button>
                    </Div>
                </Body>
                <Footer>
                    <h2>이미 초대장을 받으셨나요?</h2>
                    <Button onClick={isInvited}> 방 들어가기 </Button>
                </Footer>
            </Container>
        </Wrapper>
        <SideLeftCreateRoom2 create2={creatRoom2} setCreate2={setCreateRoom2} data={data} create1={create1} category={category}/>      
        <SideLeftCreateRoom3 create3={creatRoom3} setCreate3={setCreateRoom3} create1={create1}/>

        </>
    );
}

export default SideLeftCreateRoom1;