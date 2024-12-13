import React, { useState } from 'react';
import AllFriends from './AllFriends';
import RecommendFriends from './RecommendFriends';
import WaitingFriends from './WaitingFriends'; // 새 컴포넌트 추가
import styled from 'styled-components';

const FriendArea = styled.div`
  margin-top: -50px;
`;

const HeaderDiv = styled.div``;

const BodyDiv = styled.div``;

const LeftBtnDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    margin-left: 15px;
    padding: 10px 1px;
    font-size: 16px;
  }
`;

const LeftDiv = styled.div`
  input {
    width: 450px;
    padding: 8px 40px 8px 8px;
    border-radius: 5px;
    margin-left: 10px;
  }
  button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 50%;
  }
`;

function Friend({userData}) {
  const [inputSearchFriend, setInputSearchFriend] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // 검색어 입력 시
  const handleChangeInput = (e) => {
    setInputSearchFriend(e.target.value);
  };

  // 전체 친구 버튼 클릭
  const handleAllFriendsClick = () => {
    setActiveTab('all');
  };

  // 추천 친구 버튼 클릭
  const handleRecommendedClick = () => {
    setActiveTab('recommend');
  };

  // 대기 중 친구 버튼 클릭
  const handleWaitFriendsClick = () => {
    setActiveTab('wait');
  };

  // 검색 초기화 버튼
  const reset = () => {
    setInputSearchFriend('');
  };

  return (
    <FriendArea>
      <HeaderDiv>
        <LeftBtnDiv>
          <h3>친구</h3>
          <button onClick={handleAllFriendsClick}>모두</button>
          <button onClick={handleRecommendedClick}>요청</button>
          <button onClick={handleWaitFriendsClick}>대기 중</button>
          <button>차단 목록</button>
        </LeftBtnDiv>
      </HeaderDiv>

      <BodyDiv>
        <LeftDiv>
          <div style={{ position: 'relative', width: 'fit-content' }}>
            <input
              type="text"
              value={inputSearchFriend}
              onChange={handleChangeInput}
              placeholder="검색하기"
            />
            <button onClick={reset}>X</button> 
          </div>
        </LeftDiv>

        {activeTab === 'all' && <AllFriends searchFriend={inputSearchFriend} />}
        {activeTab === 'recommend' && <RecommendFriends searchFriend={inputSearchFriend} userData={userData}/>}
        {activeTab === 'wait' && <WaitingFriends searchFriend={inputSearchFriend} />}
      </BodyDiv>
    </FriendArea>
  );
}

export default Friend;
