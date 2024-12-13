import axios from "axios";

function FriendList({ friendList = [], noResults, activeTab, userData }) {
    
    const totalFriends = friendList.length;

    const handleAddFriend = async (e) => {
        if(userData.userCode !== null){
            const friendCode = e.target.getAttribute('data-code');            
            try {
                const resp = await axios.post('/api/addFriends', {
                    userCode: userData.userCode,  // 로그인한 유저의 userCode
                    friendCode: friendCode        // 추가할 친구의 friendCode
                });
                
                if (resp.data === 'success') {
                    alert('친구 추가 성공!');
                } else {
                    alert('친구 추가 실패');
                }
            } catch (error) {
                console.error('친구 추가 오류:', error);
                alert('오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    }
  
    return (
      <div>
        <div style={{ margin: '10px' }}>
          {activeTab === 'all'
            ? (friendList.length
                ? `모든 친구 - ${totalFriends}명`
                : '친구가 없습니다.')
            : activeTab === 'waiting'
            ? `대기 중인 친구 - ${totalFriends}명` 
            : `요청 친구 - ${totalFriends}명`
          }
        </div>
        {noResults ? (
          <div>친구가 없습니다</div>
        ) : (
          friendList.map((user) => (
              <div
                key={user.userCode}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '10px',
                  justifyContent: 'space-between', 
                }}
              >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={"/images/free-icon-user-17860209.png"}
                  alt="아이콘"
                  style={{ width: '40px', height: '40px', marginRight: '10px' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>{user.userNickName}</div>
                  <div>{user.userCode}</div>
                  {/* 추천친구일 때는 friendCode 가림 */}
                  {activeTab !== 'recommend' && (
                    <div>{user.friendCode}</div>
                  )}
                  <div>{user.userState}</div>
                </div>
              </div>
  
              {/* 모든 친구 - 채팅방 이동 버튼 */}
              {activeTab === 'all' && (
                <button
                  style={{
                    backgroundColor: '#b3b0b0',
                    color: 'white',
                    borderRadius: '50%',
                    border: 'none',
                    padding: '10px',
                    width: '50px',
                    height: '50px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    marginLeft: '10px', 
                  }}
                >
                  채팅방
                </button>
              )}
  
              {/* 요청 친구 - 친구 추가 버튼 */}
              {activeTab === 'recommend' && (
                  <button data-code={user.userCode}
                  onClick={handleAddFriend}
                  style={{
                    backgroundColor: '#b3b0b0',
                    color: 'white',
                    borderRadius: '50%',
                    border: 'none',
                    padding: '10px',
                    width: '50px',
                    height: '50px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    marginLeft: '10px', 
                }}
                >
                  친구 요청
                </button>
              )}

              {/* 대기 중인 친구 - 취소 버튼 */}      
              {activeTab === 'waiting' && (
                  <button
                  style={{
                    backgroundColor: '#b3b0b0',
                    color: 'white',
                    borderRadius: '50%',
                    border: 'none',
                    padding: '10px',
                    width: '50px',
                    height: '50px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    marginLeft: '10px', 
                  }}
                >
                  취소
                </button>
              )}
              
            </div>
          ))
        )}
      </div>
    );
  }
  
  export default FriendList;
  