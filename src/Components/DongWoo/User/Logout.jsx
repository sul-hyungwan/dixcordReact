import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

function Logout({status}) {

    const nav = useNavigate();

    axios.post('/test/api/logout')
        .then(response => {
            const iframe = document.createElement("iframe");
            iframe.src = "https://accounts.google.com/logout";
            iframe.style.display = "none"; // iframe을 숨김
            document.body.appendChild(iframe);
        
            iframe.onload = () => {
                // iframe 로드 완료 후 처리
                status(false);
                document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                window.location.href = "/"; // 로그아웃 완료 후 이동
            };
        })
        .catch(err => console.log(err));


    return (
        <div>
            
        </div>
    );
}

export default Logout;