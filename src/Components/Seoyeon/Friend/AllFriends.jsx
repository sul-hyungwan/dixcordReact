import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FriendList from './FriendList'; 

function AllFriends({ searchFriend }) {
  const [friendList, setFriendList] = useState([]);
  const [noResults, setNoResults] = useState(false);

  // 전체 친구 목록 API 호출
  const getFriendList = async () => {
    try {
      const resp = await axios.get('/api/friendAreaList?searchFriend=' + searchFriend);
      const data = resp.data;
      setFriendList(data);
      setNoResults(data.length === 0);
    } catch (error) {
      console.error('친구 목록 가져오기 중 오류 발생', error);
      setFriendList([]);
      setNoResults(true);
    }
  };

  useEffect(() => {
    getFriendList();
  }, [searchFriend]);

  return <FriendList friendList={friendList} noResults={noResults} activeTab="all" />;
}

export default AllFriends;
