import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";

const Container = styled.div`
    margin-left: 15%;
    margin-right: 15%;
    display: flex;
    justify-content: center;
    height: 800px;
`;

const InputArea = styled.div`
    margin-top: 15%;
    width: 800px;
    height: 410px;
    display: flex;
    border-radius: 4px;
    flex-direction: row;
    background-color: #3C3E43;
    color: white;
`;

const SocialDiv = styled.div`
    width: 35%;
    height: 100%;
`;

const RegisterDiv = styled.div`
    width: 65%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    p{
        font-weight: 400;
        font-size: 14px;
    }
    input[type='text'], input[type='password']{
        width: 100%;
        height: 40px;
        background-color: #232428;
        border-radius: 4px;
        border: none;
        color: white;
        padding-left: 10px;
    }
    input[type='checkbox']{
        width: 24px;
        height: 24px;
        cursor: pointer;
        appearance: none; /* 기본 체크박스 스타일 제거 */
        border-radius: 5px; /* 둥글게 만들기 */
        border: 1px solid white; /* 테두리 설정 */
        transition: background-color 0.2s ease, border-color 0.2s ease;

        
        &:hover {
            border-color: #888;
        }
    }
    input[type='checkbox']:checked {
        background-color: #3c48cf;
        background-repeat: no-repeat;
        background-position: center;
    }
`;

const UserInputSection = styled.div`
    margin: 5px;
    width: 90%;
    height: 20%;
    margin-bottom: 10px;
`;

const RedStarSpan = styled.span`
    color: red;
`;

const BtnDiv = styled.div`
    margin: 5px;
    width: 100%;
    height: 17%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const BtnSection = styled.div`
    margin-left: 10px;
    width: 92%;
    button{
        border-radius: 4px;
        border: none;
        width: 100%;
        height: 44px;
        margin-top: 15px;
        background-color: #5865F2;
        transition : 0.7s;
    }

    button:hover {
        cursor: pointer;
        transition : 0.7s;
        background-color: #3c48cf;
    }
`;
const LinkSection = styled.div`
    width: 90%;
    margin-top: 15px;
    a {
        color: #007AFF;
        text-decoration: none;
    }
`;

const SocialLogin = styled.div`
    width: 80%;
    height: 20%;
    background-color: yellow;
    &:hover {
        cursor: pointer;
    }
`;

function Login({data, status}) {

    // const location = useLocation();

    const nav = useNavigate();

    const [user, setUser] = useState({
        username : '',
        password : ''
    });

    const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID;
    const REDIRECT_URI = "http://localhost:3000";
    const SCOPE = process.env.REACT_APP_GOOGLE_SCOPE;

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUser(prev => ({
            ...prev,
            [name] : value
        }));
    }

    const handleLoginBtn = () => {
        document.querySelector('#passwordFail2').style.display = 'none';
            document.querySelector('#emailFail2').style.display = 'none';
            document.querySelector('#emailFail1').style.display = 'none';
            document.querySelector('#passwordFail1').style.display = 'none';
        if(user.username === ''){
            // 이메일 미입력
            document.querySelector('#emailFail1').style.display = 'contents';
            return;
        }
        if(user.password === ''){
            // 비밀번호 미입력
            document.querySelector('#passwordFail1').style.display = 'contents';
            return;
        }
        axios.post('/test/api/login', user)
        .then(() => {
            status(true);
            nav('/');
        })
        .catch(() => {
                document.body.style.cursor = 'progress';
                document.querySelector('button').style.cursor = 'progress';
                setTimeout(() => {
                    document.querySelector('#passwordFail2').style.display = 'contents';
                    document.querySelector('#emailFail2').style.display = 'contents';
                    document.querySelector('button').style.cursor = '';
                    document.body.style.cursor = '';
                }, 1200);
            });
    }

    const handleSocialLogin = (e) => {
        const socialLogin = e.target.getAttribute('name');
        const encodeRedi = encodeURI('http://localhost:3000/googleLogin');
        if(socialLogin === 'google'){
            const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&include_granted_scopes=true&response_type=token&redirect_uri=${encodeRedi}&client_id=638388672123-64sgadord0481eq5k9mmj1tab190vjht.apps.googleusercontent.com`;

   
            // window.location.href = googleOAuthUrl;

            const popup = window.open(googleOAuthUrl, "googleLogin", "width=600,height=400,top=300,left=600");
            if (!popup || popup.closed || typeof popup.closed == 'undefined') {
                alert("팝업이 차단되었습니다. 팝업 차단 설정을 확인해주세요.");
            }
        }
    }

    // 부모 창에서 메시지 수신
    window.addEventListener("message", (event) => {
    // 필요한 경우 origin 확인
    if (event.origin !== "http://localhost:3000") return;

    const { action } = event.data;
    if (action === "refresh") {
        // 원하는 동작 수행 (새로고침 또는 리다이렉트)
        // window.location.reload(); // 새로고침
        // 또는
        window.location.href = "/"; // 리다이렉트
    }
    });

    // useEffect(() => {
    //     // URL에 "code" 매개변수가 있는지 확인하여 Google 로그인이 성공했는지 여부를 확인
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const authorizationCode = urlParams.get("code");
    
    //     //인증 코드가 있는 경우 사용자를 로그인된 것으로 간주하loggedIn 상태를 true로 설정
    //     if (authorizationCode) {
    //         status(true);
    //     }
    //   }, []); 

    //   useEffect(() => {
    //     const params = new URLSearchParams(location.search);
    //     const authorizationCode = params.get("code");
    
    //     if (authorizationCode) {
    //       // 인증 코드를 토큰으로 교환하기 위해 POST 요청
    //       const tokenEndpoint = "https://accounts.google.com/o/oauth2/token";
    //       const data = {
    //         code: authorizationCode,
    //         client_id: process.env.REACT_APP_GOOGLE_ID,
    //         client_secret: process.env.REACT_APP_GOOGLE_PW,
    //         redirect_uri: "http://localhost:3000/",
    //         grant_type: "authorization_code",
    //       };
    
    //       axios
    //         .post(tokenEndpoint, data)
    //         .then((response) => {
    //           const accessToken = response.data.access_token;
    //           const idToken = response.data.id_token;
    
    //           // 이 토큰들을 안전하게 저장
    
            
    //           nav.push("/");
    //         })
    //         .catch((error) => {
    //           // 에러 처리
    //         });
    //     }
    //   }, [location.search, nav]);

    return (
        <Container>
            <InputArea>
                <RegisterDiv>
                    <h2 style={{marginBottom : '0'}}>환영합니다!</h2>
                    <p style={{color : 'silver' , fontSize : '15px' , margin : 'none'}}>너무 반갑소쩍새</p>
                    <UserInputSection>
                        <p>이메일 <RedStarSpan id='passwordCheck'>*</RedStarSpan> <RedStarSpan id='emailFail1' style={{display : 'none', marginRight : '360px'}}> - 이메일을 입력해주세요.</RedStarSpan>
                        <RedStarSpan id='emailFail2' style={{display : 'none', marginRight : '160px'}}> - 유효하지 않은 이메일 또는 비밀번호 입니다.</RedStarSpan></p>
                        <input type="text" name='username' value={user.username} placeholder='이메일을 입력해주세요' onChange={handleInputChange}/>
                    </UserInputSection>
                    <UserInputSection>
                        <p>비밀번호 <RedStarSpan id='passwordCheck'>*</RedStarSpan> <RedStarSpan id='passwordFail1' style={{display : 'none', marginRight : '118px'}}> - 비밀번호를 입력해주세요. ( 최소 4글자 )</RedStarSpan>
                        <RedStarSpan id='passwordFail2' style={{display : 'none', marginRight : '118px'}}> - 유효하지 않은 이메일 또는 비밀번호 입니다.</RedStarSpan></p>
                        <input type="password" name='password' value={user.password} placeholder='비밀번호를 입력해주세요' onChange={handleInputChange}/>
                    </UserInputSection>
                    <BtnDiv>
                        <BtnSection>
                            <button type="button" onClick={handleLoginBtn}>로그인</button>
                        </BtnSection>
                        <LinkSection>
                            <span style={{color : 'silver'}}>계정이 필요하신가요?</span> <Link to={'/register'}> 가입하기</Link>
                            <Link to={'/findPw'} style={{marginLeft : '60px'}}> 비밀번호를 잊으셨나요? </Link>
                        </LinkSection>
                    </BtnDiv>
                </RegisterDiv>
                <SocialDiv>
                    <h1>소셜 영역</h1>
                    <SocialLogin name='google' onClick={handleSocialLogin}>구글 로그인</SocialLogin>
                    <SocialLogin>네이버 로그인</SocialLogin>
                    <SocialLogin>카카오 로그인</SocialLogin>
                </SocialDiv>
            </InputArea>
        </Container>
    );
}

export default Login;