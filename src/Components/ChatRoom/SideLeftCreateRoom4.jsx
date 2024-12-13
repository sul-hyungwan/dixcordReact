import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: fixed; /* 화면에 고정 */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999; /* 컨텐츠보다 위에 표시 */
`;

const Container = styled.div`
text-align: center;
border: 1px solid black;
padding: 20px;
margin-bottom:20px;
width: 600px;
position: relative;
background-color: #F5F7F8;
z-index: 1000;
        

`
const Header = styled.div`

`
const H1 = styled.h1`

`
const Body = styled.div`
padding: 10px;
`
const Div = styled.div`

`
const Button = styled.button`

`
const Section = styled.section`

`
const Footer = styled.footer`

`
const Span = styled.span`
        color: #aaa;
	    font-size: 28px;
	    font-weight: bold;
	    cursor: pointer;
        transition: color 0.3s ease;
        position: absolute; /* 절대 위치로 설정 */
        top: 5px; /* 상단에서 10px */
        right: 10px;
    `


const ImageBtn = styled.button`
`

function SideLeftCreateRoom4({ data, create4, setCreate4, create2, category }) {



    const [userName, setUserName] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [imageFile, setImageFile] = useState(null);



    const getUserName = async () => {
        const response = await axios.get(`/api/room/getUserName/${data.userCode}`);
        const result = response.data;

        setUserName(result);
    }

    useEffect(() => {
        if (data !== null) {
            getUserName();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const handleModalClose = () => {
        setCreate4(false);
    }

    const goBack = () => {
        setCreate4(false);
        create2(true);
    }


    //파일 확장자 체크
    const regex = new RegExp("(.*?)\.(exe|sh|zip|alz)$");
    const MAX_SIZE = 52428800; //50MB


    function checkExtension(fileName, fileSize) {
        if (fileSize >= MAX_SIZE) {
            alert("파일 사이즈 초과");
            return false;
        }
        if (regex.test(fileName)) {
            alert("해당 종류의 파일은 업로드 할 수 없습니다.");
            return false;
        }
        return true;
    }


    //const inputFile = document.querySelector("#fileInput");



    //파일 선택 후 미리보기
    const handleChange = (e) => {

        const file = e.target.files[0];
        console.log(file);

        if (file &&checkExtension(file.name, file.size)) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageSrc(event.target.result);
            };
            reader.readAsDataURL(file);
        }






    };

    //파일 업로드
    const handleUpload = async () => {
       
      
       
        const formData = new FormData();
        formData.append("uploadFile", imageFile);
        
        try {
            const response = await axios.post('/api/room/uploadFile', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Fiile upload success" + response.data);
            setImageSrc(response.data);
        } catch (err) {
            console.error("File upload failed:", err);
        }
    }


    //방 생성
    const createRoom = async () => {

        if (!imageSrc) {
            alert("이미지를 업로드 하세요");
        }
        const roomName = document.getElementById('roomTitle').value;
        const authCode = (Math.floor(Math.random() * 900000) + 100000).toString(); 

        const roomData = {
            userCode:`${data.userCode}`,
            roomTitle:roomName,
            roomCategory:category,
            roomIcon:imageSrc,
            roomInviteCode:authCode,
        };

        console.log(roomData);


        try {
            
            const response = await axios.post('/api/room/createRoom', roomData,{
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                alert("방이 성공적으로 생성되었습니다.");
                setCreate4(false);
            } else {
                alert("방 생성에 실패했습니다.");
            }
        } catch (error) {
            console.error("error" + error);
        }

        
    }





    const handleDelete = () => {

    }



    return (
        <Wrapper style={create4 === true ? { display: 'flex' } : { display: 'none' }}>
            <Container>
                <Header>
                    <Span onClick={handleModalClose}>&times;</Span>
                    <H1>방 커스터마이즈하기</H1>
                    <p>방에 이름과 아이콘을 부여해 개성을 드러내 보세요. 나중에 언제든 바꿀 수 있어요. </p>
                </Header>
                <Body>
                    <Div>
                        <input
                            accept='image/*'
                            onChange={handleChange}
                            onClick={handleUpload}
                            name="uploadFile"
                            //multiple="multiple"
                            type='file'
                            id='fileInput'>
                        </input>

                        <div className="uploadResult">
                            {imageSrc && <img id='uploadImgOne' src='\\192.168.0.140\C:\User\sdedu\Pictures\uploadImg/4.jpg' alt="Uploaded Preview" />}
                        </div>
         
                    </Div>
                    <Div>
                        <p>방 이름</p>
                        <input id='roomTitle' type='text' value={`${userName}의 방`}  ></input>
                        <p>카테고리</p>
                        <input type='text' value={category}></input>
                        <p>방을 만들면 Dixdord의 **<Link>커뮤니티지침</Link>**에 동의하게 됩니다.</p>
                    </Div>
                </Body>
                <Footer>
                    <Div>
                        <Section>
                            <Button onClick={goBack}>뒤로 가기</Button>
                        </Section>
                        <Section>
                            <Button onClick={createRoom}>만들기</Button>
                        </Section>
                    </Div>
                </Footer>

            </Container>
        </Wrapper>
    );
}

export default SideLeftCreateRoom4;