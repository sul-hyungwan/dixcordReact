import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RightArea from './RightArea';  // RightArea 컴포넌트 임포트

function SideBar(props) {
    const [friendList, setFriendList] = useState([]);
    const [inputFriend, setInputFriend] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getFriendList = async () => {
        const resp = await axios.get('/api/sideBarFriend');
        const data = resp.data;
        console.log(data); // 확인용
        setFriendList(data);
    };

    useEffect(() => {
        getFriendList();
    }, []);
  
    const handleChangeInput = e => {
        setInputFriend(e.target.value);
    };

    const openModal = () => {
        setIsModalOpen(true); 
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <RightArea 
                friendList={friendList} 
                openModal={openModal} 
            />

            {/* 모달 */}
            {isModalOpen && (
                <>
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)' }} onClick={closeModal} />
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', border: '1px solid #ccc', zIndex: 1000 }}>
                    <h3>친구 선택하기</h3>
                    <p>친구를 9명 더 추가할 수 있어요.</p>
                    <input 
                        type="text" 
                        value={inputFriend} 
                        onChange={handleChangeInput}
                    />
                    <br />
                    {friendList.map((user) => (
                        <div key={user.userCode}>
                            <span>{user.userIcon} {user.userNickName}</span>
                        </div>
                    ))}
                    <button onClick={closeModal}>DM 생성</button>
                </div>
                </>
            )}
        </div>
    );
}

export default SideBar;
