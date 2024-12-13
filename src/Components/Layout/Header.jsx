import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {styled} from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 15%;
    margin-right: 15%;
`;

const LogoArea = styled.div`
    width: 100px;
    height: 100px;

    img{
        width: 100%;
        height: 100%;
    }
`;

const BtnArea = styled.div`
    a{
        margin-left: 10px;
        text-decoration: none;
        color: black;
    }

    a:hover{
        font-size: 1.1em;
    }
`;


function Header({data}) {

    return (
        <Container>
            <LogoArea>
                <img src="logo192.png" alt="" />
            </LogoArea>
            {data !== null ? 
                <BtnArea>
                    <Link to={'/logout'}>로그아웃</Link> 
                </BtnArea>
                : <BtnArea>
                    <Link to={'/login'}>로그인</Link>
                    <Link to={'/register'}>회원가입</Link>
                </BtnArea>
            }
        </Container>
    );
}

export default Header;