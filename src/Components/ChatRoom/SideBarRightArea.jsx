import React from 'react';
import styled from 'styled-components';
import SideBar from '../Seoyeon/SideBar/SideBar';



const Container = styled.div`
    border: 1px solid black;
   margin: 0 auto;
    display: flex;
    flex-direction: column; /* 상단-중앙-하단 구조 */
    box-sizing: border-box; /* 여백 계산 포함 */
    
`


const Header = styled.div`
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px;
    box-sizing: border-box;
 
`
const Body = styled.div`
    border: 1px solid black;
    height: 60%;
    padding: 10px;
    box-sizing: border-box;
`
const Footer = styled.div`
    height: 10%; /* 전체 높이의 10% */
    padding: 5px;
    border-top: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    
`

const Separator = styled.div`
    height: 1px;
    width: 150px;
    border-radius: 1px;
    background-color: gray;
    margin: 10px 0;
   
`

const DownArrow = styled.span`
     width: 5px;
     height: 5px;
     border-top:2px solid black;
     border-right:2px solid black;
     display: inline-block;
     transform: rotate(135deg);
     position: relative;
     margin-bottom: 5px;
     margin-left: 80px; 
     z-index: -10;
`

const DownArrow2 = styled(DownArrow)`
  margin: 0 5px;

`




function SideBarRightArea({ sideStatus }) {


    return (
        <>
            {sideStatus === 'room' ?
                <Container>
                    <Header>
                        <div>
                            <section>방 이름</section>
                            <section>
                                <DownArrow></DownArrow>
                            </section>
                        </div>
                        <div>이벤트</div>
                        <Separator></Separator>
                        <div>
                            <section><DownArrow2></DownArrow2></section>
                            <section>채팅 채널</section>
                        </div>
                        <div>
                            <section className='hashTag'></section>
                            <section>채팅 채널 이름</section>
                        </div>
                        <div>
                            <section className='userStatus'></section>
                            <section>음성 채널 이름</section>
                        </div>
                    </Header>
                    <Body>
                            <div>
                                    채팅 참여 유저
                            </div>
                    </Body>
                    <Footer>
                        푸터
                    </Footer>
                </Container>

                :
                <Container>
                    <SideBar/>
                </Container>
            }
        </>
    );
}

export default SideBarRightArea;