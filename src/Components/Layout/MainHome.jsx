import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
    margin-left: 15%;
    margin-right: 15%;
    display: flex;
    flex-direction: column;
    height: 800px;
`;

const MainBodyArea = styled.div`
    height: 100%;
`;

const MainOneDiv = styled.div`
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 3%;
    margin-bottom: 3%;
    height: 25%;
    display: flex;
    flex-direction: row;
    border: 1px solid black;
    padding: 2%;
`;

const MainTwoDiv = styled.div`
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 3%;
    margin-bottom: 3%;
    height: 25%;
    display: flex;
    flex-direction: row;
    border: 1px solid black;
    padding: 2%;
`;

const MainThreeDiv = styled.div`
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 3%;
    margin-bottom: 3%;
    height: 25%;
    display: flex;
    flex-direction: row;
    border: 1px solid black;
    padding: 2%;
`;

const ImgSection = styled.div`
    width: 60%;
    background-image: url(https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/6634cb38dc3cb7acca8fa801_BKG.webp);
`;

const TextSection = styled.div`
    width: 40%;
`;
function MainHome(props) {
    // const [user, setUser] = useState([]);

    // const getUser = async () => {
    //     // 2. 게시글 목록 데이터 받아오기
    //     const resp = await axios.get('/api/getUserList');
    //     const data = resp.data;
    //     console.log(data);
    //     // 3. 게시글 목록 데이터 상태값(state)에 할당
    //     setUser(data);
    //     console.log(user);
    // }

    // useEffect( () => {
    //     getUser();
    // }, []);

    return (
        <Container>
            <MainBodyArea>
                <MainOneDiv>
                    <ImgSection>
                        {/* <img src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/6620ec7544fa3849c3cb27fc_party_wumpus.gif" alt="" /> */}
                    </ImgSection>
                    <TextSection>
                        텍스트설명영역
                    </TextSection>
                </MainOneDiv>
                <MainTwoDiv>
                    <TextSection>
                        텍스트설명영역
                    </TextSection>
                    <ImgSection>
                        이미지 영역
                    </ImgSection>
                </MainTwoDiv>
                <MainThreeDiv>
                    <ImgSection>
                        이미지 영역
                    </ImgSection>
                    <TextSection>
                        텍스트설명영역
                    </TextSection>
                </MainThreeDiv>
            </MainBodyArea>
        </Container>
    );
}

export default MainHome;