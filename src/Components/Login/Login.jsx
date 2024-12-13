import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({data, status}) {

    const nav = useNavigate();

    const [user, setUser] = useState({
        username : '',
        password : ''
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUser(prev => ({
            ...prev,
            [name] : value
        }));
    }

    const handleLoginBtn = () => {
        axios.post('/test/api/login', user)
            .then(response => {
                console.log(response.data);
                status(true);
                nav('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <form method='POST'>
                <input type="text" name='username' value={user.username} placeholder='이메일을 입력해주세요' onChange={handleInputChange}/>
                <input type="password" name='password' value={user.password} placeholder='비밀번호를 입력해주세요' onChange={handleInputChange}/>
                <button type="button" onClick={handleLoginBtn}>로그인</button>
            </form>
        </div>
    );
}

export default Login;