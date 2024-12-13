import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FriendList from './FriendList'; 

function RecommendFriends({ searchFriend, userData }) {
  const [friendList, setFriendList] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [user, setUser] = useState();

  // 추천 친구 목록 API 호출
  const getRecommendList = async () => {
    try {
      const resp = await axios.get('/api/recommendFriends', {
        params: { searchRecommendFriend: searchFriend },
      });
      const data = resp.data;
      setFriendList(data);
      setNoResults(data.length === 0);
    } catch (error) {
      console.error('추천 친구 가져오기 중 오류 발생', error);
      setFriendList([]);
      setNoResults(true);
    }
  };

  useEffect(() => {
    getRecommendList();
  }, [searchFriend]);
  
  useEffect(() => {
    if(userData !== null){
        setUser(userData);
    }
  }, [userData]);

  return <FriendList friendList={friendList} noResults={noResults} activeTab="recommend" userData={user}/>;
}

export default RecommendFriends;
