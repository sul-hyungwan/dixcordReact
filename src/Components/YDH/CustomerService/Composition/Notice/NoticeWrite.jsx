import React, { useState } from 'react';
import styled from 'styled-components';
import ServiceSearch from '../../ServiceSearch';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 사용
import axios from 'axios'; // API 요청을 위해 axios 사용

// 스타일 정의
const Area = styled.div`
    
`
;

// NoticeWrite 함수형 컴포넌트 선언
// props 부모 컴포넌트로부터 전달된 속성
function NoticeWrite() {
    const nav = useNavigate();

    // 게시글 입력 값 관리
    const [inputs, setInputs] = useState({
        title: '',
        writer: '',
        content: '',
    });

    // 업로드된 파일 정보 관리
    const [uploadedFiles, setUploadedFiles] = useState({
        uuid: '',
        uploadPath: '',
        uploadName: ''
    });

    const handleChangeInputs = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

     // 게시글 등록 버튼 클릭 시 실행되는 함수
     const registerNotice = async () => {
        // try-catch : 에러 처리, 프로그램이 중단되지 않음
        try {
            // 1. 데이터 검증
            const inputValueArr = Object.values(inputs); // inputs 객체의 값을 배열로 변환
            const isEmpty = inputValueArr.some(value => value === ''); // 입력 값 중 하나라도 비어있으면 true 반환
    
            if (isEmpty) {
                alert("모든 내용을 입력하세요."); // 경고 메시지
                return; // 함수 종료
            }
    

            console.log(inputs);
            console.log(uploadedFiles);

            const response = await axios.post('/NoticeWrite', {
                inputs : inputs,
                uploadedFiles : uploadedFiles
            });

            if (response.status === 200) {
                alert('등록이 완료되었습니다!');
                moveToNoticeList();
            }

            
        } catch (error) {
            // 서버 오류 또는 알 수 없는 오류 처리
            if (error.response && error.response.status === 500) {
                alert("서버 오류가 발생했습니다. 잠시 후 다시 시도하세요.");
            } else {
                alert("알 수 없는 오류가 발생했습니다.");
            }
        }
    };

    const resetInputs = () => {
        setInputs({
            title: '',
            writer: '',
            content: '',
        });
        setUploadedFiles([]);
    };

    const moveToNoticeList = () => {
        nav('/service/notice');
    };

    const handleFileUpload = async (files) => {
        const allowedExtensions = ['png', 'jpg', 'jpeg', 'jfif']; // 허용된 확장자 목록
        const formData = new FormData();
    
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileExtension = file.name.split('.').pop().toLowerCase(); // 확장자 추출
            if (!allowedExtensions.includes(fileExtension)) {
                alert(`"${file.name}"은(는) 허용되지 않는 파일 형식입니다.`);
                return;
            }
            formData.append('uploadFile', file);
        }
    
        try {
            const response = await axios.post('/noticeUploadFiles', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 200) {
                console.log('Uploaded files:', response.data);
                setUploadedFiles(...response.data);
            }
        } catch (error) {
            console.error('File upload failed:', error);
        }
    };

    

    return (
        <Area>
            <ServiceSearch />
            <div>
                <div>
                    <label>제목</label>
                    <input
                        type="text"
                        name="title"
                        value={inputs.title}
                        onChange={handleChangeInputs}
                    />
                </div>
                <div>
                    <label>작성자</label>
                    <input
                        type="text"
                        name="writer"
                        value={inputs.writer}
                        onChange={handleChangeInputs}
                    />
                </div>
                <div>
                    <label>내용</label>
                    <textarea
                        name="content"
                        cols={30}
                        rows={10}
                        value={inputs.content}
                        onChange={handleChangeInputs}
                    ></textarea>
                </div>
                <div className="file-container">
                    <div className="file-header">
                        <div className="file-title">
                            <a>파일 첨부</a>
                        </div>
                    </div>
                    <div className="file-body">
                        <div className="uploadDiv">
                            <input
                                type="file"
                                name="uploadFile"
                                multiple
                                onChange={(e) => handleFileUpload(e.target.files)}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={registerNotice}>등록</button>
                    <button onClick={resetInputs}>초기화</button>
                    <button onClick={moveToNoticeList}>목록으로 이동</button>
                </div>
            </div>
        </Area>
    );
}

export default NoticeWrite;