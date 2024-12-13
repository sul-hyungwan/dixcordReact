import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SideLeftCreateRoom1 from './SideLeftCreateRoom1';
import SideLeftCreateRoom2 from './SideLeftCreateRoom2';

const Container = styled.div`
height: 100%;
overflow-y: hidden;
border:1px solid #5f5f5f;
text-align: center;  
background-color:#181C14;
padding: 10px;
padding-top: 10px;
display: flex;
flex-direction: column;
align-items: center; /* 가로 중앙 정렬 */
justify-content: flex-start; /* 세로 상단 정렬 */

`
const RoomDiv = styled.div`
    
`
const RoomCreateDiv = styled.div`
    
`
const Button = styled.button`
    
`
const RoomSelectDiv = styled.div`
    
`
const Circle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex; 
  align-items: center;
  justify-content: center;
  cursor: pointer;
 
`
const Circle1 = styled(Circle)`
    background-color: rgba(255,255,255,0.5);
    background-image: url('/images/yoon/plus.webp');
    margin: 0 auto;
  
`

const Circle2 = styled(Circle)`
    width: 50px; 
    height: 50px;
    background-color:rgb(255,255,255,0.2);
    background-image: url('/images/yoon/plus.webp');
    margin: 0 auto;
    
`
const Circle3 = styled(Circle2)`
    background-image: url('/images/yoon/compass.webp');
    margin: 10px auto; 
    background-size: 60%; 
`
const Li = styled.li`
    list-style-type:none;
    margin-bottom:10px;

`

const Ul = styled.ul`
    padding: 0;
    
    

`
const Separator = styled.div`
    height: 2px;
    width: 32px;
    border-radius: 1px;
    background-color: gray;
    margin-top: 20px;
   
`







function SideBarLeftArea({data,rightSide,roomStatus}) {


    const[chatList, setChatList] = useState([]);

    const[creatRoom, setCreateRoom] = useState(false);

    const nav = useNavigate();



    const getChatList = async () => {
        const response = await axios.get(`/api/room/getChatList/${data.userCode}`);
        const result = await response.data;
        // console.log(result);
        setChatList(result);
    }

    useEffect(() => {
        if (data !==null) {
            // console.log("챗 리스트:" + data.userCode);

            getChatList();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleOnclickRoom = (e) => {
        rightSide('room');
        nav('/room/' + e.target.getAttribute('num'));
        // roomStatus('chatRoom');
    }


    const handleOnclickLogo = () => {
        rightSide('friend');
        roomStatus('main');
    }

    const handleCreateRoom = () => {
        setCreateRoom(true);
    }

   
    return (
      <>
      <Container>
    
        <Circle1 style={{backgroundImage:'url(/images/yoon/logo.png)'}} onClick={handleOnclickLogo}></Circle1>
        <Separator></Separator>
        <RoomDiv>
            <Ul>
                {chatList.map(list => (
                    <Li key={list.roomNumber}>
                        <Circle  style={{backgroundImage:`url('/images/yoon/${list.roomIcon}')`}} num={list.roomNumber} onClick={handleOnclickRoom}></Circle>
                    </Li>
                ))}
                <Circle2 onClick={handleCreateRoom}></Circle2>
                <Circle3></Circle3>
            </Ul>
        </RoomDiv>
      </Container>
      
      <SideLeftCreateRoom1 data={data} create={creatRoom} create1={setCreateRoom} /> 
     
    </>

    );
}

export default SideBarLeftArea;