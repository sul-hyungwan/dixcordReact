import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BodyTopSection = styled.div`
    font-size: large;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const BodyListSection = styled.div`
    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 10px;
        margin-bottom: 5px;
        width: 100%; 
    }
    overflow-x: hidden; 
`;

const BodyDiv = ({ friendList, openModal }) => {
    return (
        <div style={{ marginLeft: '10px', flexGrow: '1', overflowY: 'auto' }}>
            <BodyTopSection>
                <Link to={`/friend`}>친구</Link>
            </BodyTopSection>

            <BodyListSection>
                <span>친구 목록</span>
                <button 
                    onClick={openModal} 
                    style={{ margin: '10px', marginLeft: '50px' }}
                >
                    +
                </button>
                {friendList.map((user) => (
                    <div key={user.userCode}>
                        <img 
                            src={"/images/free-icon-user-17860209.png"} 
                            alt="아이콘" 
                            style={{ width: '40px', height: '40px', marginRight: '5px', verticalAlign: 'middle' }}
                        />
                        <div>{user.userNickName}</div>
                    </div>
                ))}
            </BodyListSection>
        </div>
    );
};

export default BodyDiv;
