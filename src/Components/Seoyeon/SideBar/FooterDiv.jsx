import React from 'react';
import styled from 'styled-components';

const FooterDivWrapper = styled.div`
    padding: 10px;
    background: #D9D9D9;
    flex-shrink: 0;
    `;

const MyTabSection = styled.div`
    display: flex;
    align-items: center;
`;

function FooterDiv ({ friendList }) {
    return (
        <FooterDivWrapper>
            <MyTabSection>
                {friendList.length > 0 && (
                    <div key={friendList[0].userCode} style={{ display: 'flex', alignItems: 'center' }}>
                        <img 
                            src={"/images/free-icon-user-17860209.png"} 
                            alt="아이콘" 
                            style={{ width: '40px', height: '40px', marginRight: '10px' }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginRight: '10px' }}>{friendList[0].userNickName}</div>
                            <div style={{ marginRight: '-20px' }}>{friendList[0].userState}</div>
                        </div>
                        <img 
                            src={"/images/free-icon-microphone-black-shape-25682.png"} 
                            alt="마이크" 
                            style={{ width: '20px', height: '20px', marginLeft: '50px' }}
                        />
                        <img 
                            src={"/images/free-icon-headsets-15702430.png"} 
                            alt="헤드셋" 
                            style={{ width: '20px', height: '20px', marginLeft: '10px' }}
                        />
                        <img 
                            src={"/images/free-icon-settings-3171061.png"} 
                            alt="설정" 
                            style={{ width: '20px', height: '20px', marginLeft: '10px' }}
                        />
                    </div>
                )}
            </MyTabSection>
        </FooterDivWrapper>
    );
};

export default FooterDiv;
