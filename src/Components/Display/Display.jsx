import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Login from '../DongWoo/User/Login';
import MainHome from '../Layout/MainHome';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from '../Layout/Header';
import Main from '../Layout/Main';
import Logout from '../DongWoo/User/Logout';
import Register from '../DongWoo/User/Register';
import axios from 'axios';
import SideBarLeftArea from '../ChatRoom/SideBarLeftArea';
import SideBarRightArea from '../ChatRoom/SideBarRightArea';
import ChatRoom from '../ChatRoom/ChatRoom';
import Friend from '../Seoyeon/Friend/Friend';
import CustomerService from '../YDH/CustomerService/CustomerService';
import NoticeMain from '../YDH/CustomerService/Composition/Notice/NoticeMain';
import QnAMain from '../YDH/CustomerService/Composition/QnA/QnAMain';
import StartPageMain from '../YDH/CustomerService/Composition/StartPage/StartPageMain';
import MyQuestionMain from '../YDH/CustomerService/Composition/MyQuestion/MyQuestionMain';
import NoticeDetail from '../YDH/CustomerService/Composition/Notice/NoticeDetail';
import NoticeModify from '../YDH/CustomerService/Composition/Notice/NoticeModify';
import NoticeWrite from '../YDH/CustomerService/Composition/Notice/NoticeWrite';
import Test from '../Hoyeon/Test';
import GoogleAuthRedirect from '../DongWoo/User/GoogleAuthRedirect';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 900px;
    width: 100%;
    box-sizing: border-box;
    display: inline-block;
    overflow: hidden;
`;

const HeaderArea = styled.div`
    height: 10%; /* 헤더 영역 */
    box-sizing: border-box;
`;

const BodyArea = styled.div`
    display: flex; /* 가로로 나열 */
    flex-direction: row;
    height: 90%; /* BodyArea의 높이를 전체의 90%로 설정 */
    width: 100%;
    box-sizing: border-box;
`;
const SideBarDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

const MainContentDiv = styled.div`
    flex-grow: 1;
`;

function fetchGoogleUserInfo(accessToken, setLoginStatus) {
    fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response2 => response2.json())
    .then(data => {
        // 받은 사용자 정보를 React 앱 상태에 저장하거나 처리
        axios.get('/test/api/emailCheck?email=' + data.email)
            .then(response => {
                if(!response.data){
                    if(window.confirm('존재하지 않는 이메일 입니다. 구글 정보로 회원가입 하시겠습니까?')){
                        console.log(data.email);
                        const registerUser = {
                            userEmail : data.email,
                            userPassword : 'dixcord1234',
                            userName : data.name,
                            userNickName : '(미입력)',
                            userIcon : '(미입력)',
                            userPhone : '(미입력)',
                            userBirthday : '2024-12-13',
                            interest : []
                        }
                        axios.post('/user/api/register', registerUser)
                            .then(result => {
                                console.log(result.data);
                            })
                            .catch(erer => console.log("회원가입 에러" + erer));
                    }else {
                        window.location.hash = '';
                    }
                }else {
                    // 로그인 시켜주기
                    const user = {
                        username : response.data.userEmail,
                        password : 'dixcord1234'
                    }
                    axios.post('/test/api/login', user)
                    .then(() => {
                        setLoginStatus(true);
                    }).catch(err2 => console.log('로그인 에러 : ' + err2));
                }
            })
            .catch(err => console.log('이메일 체크 에러 : ' + err));
        
    })
    .catch(error => {
        console.error('Error fetching user info:', error);
    });
}


function Display(props) {

    const [getUser, setUser] = useState(null);

    const [loginStatus, setLoginStatus] = useState(false);

    const [sideBarStatus, setSideBarStatus] = useState('friend');

    const [chatRoomStatus, setChatRoomStatus] = useState();

    const nav = useNavigate();

    // 구글 로그인 정보 조회
    const hash = window.location.hash; 
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get('access_token');

    if (accessToken && getUser === null) {
        // 액세스 토큰을 통해 사용자 정보 요청
        fetchGoogleUserInfo(accessToken, setLoginStatus);
    }


    const loginUser = async () => {
        await axios.get('/test/api/user')
            .then(response => {
                if(response.data.principal.member === undefined){
                    setUser(null);
                    return;
                }
                setUser(response.data.principal.member);
                nav('/');
            });
        }
        
    useEffect(() => {
        loginUser();
    }, [loginStatus]);
    
    useEffect( () => {
        console.log(getUser);
        if(getUser !== null && getUser.userState !== '온라인'){
            axios.get('/user/api/loginState?userCode=' + getUser.userCode)
                .then((response) => {
                    console.log(response.data);
                })
                .catch(err => console.log('update err : ' + err));
        }
    }, [getUser]);
    

    return (
        <>
            { getUser === null ? 
            <>
                <HeaderArea>
                    <Header data={getUser}/>
                </HeaderArea>
                <>
                    <Routes>
                        <Route path='/' element={<MainHome/>}/>
                        <Route path='/login' element={<Login data={setUser} status={setLoginStatus}/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path='/service' element={<CustomerService/>}/>
                        <Route path='/service/qna' element={<QnAMain/>}/>
                        <Route path='/service/notice' element={<NoticeMain/>}/>
                        <Route path='/service/notice/:idx' element={<NoticeDetail/>}/>
                        <Route path='/service/startpage' element={<StartPageMain/>}/>
                    </Routes>
                </>
            </>
            : 
            <Container>
                <HeaderArea>
                    <Header data={getUser}/>
                </HeaderArea>
                <BodyArea>
                    <SideBarDiv>
                        <SideBarLeftArea data={getUser} rightSide={setSideBarStatus} roomStatus={setChatRoomStatus}/>
                        <SideBarRightArea sideStatus={sideBarStatus}></SideBarRightArea>
                    </SideBarDiv>
                    <MainContentDiv>
                        <Routes>
                            <Route path='/' element={<Main/>}/>
                            <Route path="/friend" element={<Friend userData={getUser}/>} />
                            <Route path='/room/:pId' element={<ChatRoom/>}/>
                            <Route path='/logout' element={<Logout status={setLoginStatus}/>}/>
                            <Route path='/service' element={<CustomerService/>}/>
                            <Route path='/service/qna' element={<QnAMain/>}/>
                            <Route path='/service/notice' element={<NoticeMain/>}/>
                            <Route path='/service/notice/:idx' element={<NoticeDetail/>}/>
                            <Route path='/service/startpage' element={<StartPageMain/>}/>
                            <Route path='/service/myquestion' element={<MyQuestionMain/>}/>
                            <Route path='/service/notice/write' element={<NoticeWrite/>}/> {/* 관리자 전용 */}
                            <Route path='/service/notice/modify/:idx' element={<NoticeModify/>}/>
                            <Route path='/chat' element={<Test user={getUser}/>}/>
                            <Route path='/googleLogin' element={<GoogleAuthRedirect/>}/>
                        </Routes>
                    </MainContentDiv>
                </BodyArea>
            </Container>
            }
        </>
    );
}

export default Display;