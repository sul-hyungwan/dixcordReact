import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FriendList from './FriendList'; 

function WaitingFriends({ searchFriend }) {
  const [waitingFriends, setWaitingFriends] = useState([]);
  const [noResults, setNoResults] = useState(false);

  // 대기 중 친구 리스트 가져오기
  const getWaitingFriends = async () => {
    try {
      const response = await axios.get('/api/waitFriends', {
        params: { searchWaitFriend: searchFriend },
      });
      const data = response.data;
      setWaitingFriends(data);
      setNoResults(data.length === 0); 
    } catch (error) {
      console.error('대기 중 친구 리스트를 가져오는 중 오류 발생:', error);
      setWaitingFriends([]); 
      setNoResults(true); 
    }
  };

  useEffect(() => {
    getWaitingFriends();
  }, [searchFriend]);

  return <FriendList friendList={waitingFriends} noResults={noResults} activeTab="waiting" />;
}

export default WaitingFriends;
