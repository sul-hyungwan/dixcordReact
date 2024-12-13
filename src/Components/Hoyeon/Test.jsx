import React, { useState, useEffect } from 'react';

const Test = ({ user }) => {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState('');
  const [senderCode, setSenderCode] = useState(user.userCode);
  const [senderName, setSenderName] = useState(user.userNickName);
  const [senderIcon, setSenderIcon] = useState(user.userIcon);
  const [messages, setMessages] = useState([]); // 서버에서 가져온거 쓸때
  const [editingChatguid, setEditingChatguid] = useState(null); // 수정 상태 관리
  const [editedMessage, setEditedMessage] = useState(''); // 수정 메시지 상태
  
  
  // 내 유저 정보가 담겨있는 함수
  useEffect(() => {

  }, [user]);

  // 웹소켓 연결 함수
  const openSocket = () => {
    const socket = new WebSocket(`ws://localhost:9080/chat?userCode=${senderCode}`);

    socket.onopen = () => console.log('WebSocket connected');
    socket.onerror = (error) => console.error('WebSocket Error:', error);


    // 메시지 수신 이벤트
    socket.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        const newMessage = {
          userCode: data.userCode,
          userNickName: data.userNickName,
          content: data.message,
          date: data.date,
          userIcon: data.userIcon,
          chatguid: data.chatguid
        };

        // console.log(data); // 서버에 있는 데이터들 (오브젝트)
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        // console.log(newMessage);
      } catch (err) {
        console.error('Invalid JSON received', err);
      }
    };

    setWs(socket);
  };
  // 메시지 전송 함수
  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const timestamp = Date.now();
      const formattedMessage = JSON.stringify({
        action: "sendMessage",
        userCode: senderCode,
        userNickName: senderName,
        message: message,
        date: timestamp,
        userIcon: senderIcon,
      });
      ws.send(formattedMessage);  // 서버에 메시지 전송
      

      setMessage('');  // 입력 필드 초기화

      
    }
  };

  const closeSocket = () => {
    if (ws) {
      ws.close();
      setWs(null);
    }
  };
  
 // 날짜 포맷팅 함수
 const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

const btnClickHandler = (e, chatguid, userCode, content) => {
  const { name } = e.target;

  
  if (name === 'delete_text') {
    const deleteMessage = JSON.stringify({
      action: "deleteMessage",
      userCode: userCode,
      chatguid: chatguid,
    });

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(deleteMessage);
      // 로컬 메시지 상태에서 즉시 삭제 반영
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.chatguid !== chatguid) 
      );
      

    }
  } else if (name === 'modify_text') {
    // console.log('modify_text');
    setEditingChatguid(chatguid); // 수정모드
    setEditedMessage(content); // input필드에서 내용을 수정할수 있게하는거
  }
};

const saveEditedMessage = (chatguid) => {
  // console.log(chatguid);
  // console.log(editedMessage)
  if(editedMessage === ''){
    // console.log(1);
    alert('테스트');
  }
  const editMessage = JSON.stringify({
    action: 'editMessage',
    userCode: senderCode,
    chatguid: chatguid,
    message: editedMessage,
  });

  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(editMessage);
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.chatguid === chatguid ? { ...msg, content: editedMessage + '(수정됨)' } : msg
      )
    );
    setEditingChatguid(null); // 수정메시지 초기화
    setEditedMessage(''); 
  }
};

return (
  <div>
    <input
      type="text"
      placeholder="Enter a message"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button onClick={openSocket}>Open WebSocket</button>
    <button onClick={sendMessage}>Send</button>
    <button onClick={closeSocket}>Close</button>

    <div id="chat">
      {messages.map((msg, index) => {
        const currentDate = formatDate(msg.date);
        const prevDate =  index > 0 ? formatDate(messages[index - 1].date) : null;
        const showDateDivider = currentDate !== prevDate;

        return msg.userCode === undefined ? null : (
          <div key={msg.chatguid} className='chatDiv'>
            {showDateDivider && (
              <div style={{ textAlign: 'center', margin: '10px 0' }}>
                <hr />
                <span style={{ backgroundColor: '#f9f9f9', padding: '0 10px' }}>
                  {currentDate}
                </span>
              </div>
            )}
            <div>
              <img
                src={msg.userIcon}
                style={{
                  width: '50px',
                  height: '60px',
                  objectFit: 'cover',
                  marginRight: '10px',
                }} alt=''
              />
               <strong data-code={msg.userCode}>{msg.userNickName}</strong>
              {/* <span>{new Date(msg.date).toLocaleTimeString()}</span>  */}
              
              {editingChatguid === msg.chatguid ? (
                  <div>
                    <input
                      type="text"
                      value={editedMessage}
                      onChange={(e) => setEditedMessage(e.target.value)}
                    />
                    <button onClick={() => saveEditedMessage(msg.chatguid)}>나중에enter로바꿀거임</button>
                    <button onClick={() => setEditingChatguid(null)}>나중에esc로바꿀꺼임</button>
                  </div>
                ) : (
                  <>
                    : {msg.content}
                    <span>{new Date(msg.date).toLocaleTimeString()}</span>
                    <button
                      type="button"
                      name="modify_text"
                      onClick={(e) =>
                        btnClickHandler(e, msg.chatguid, msg.userCode, msg.content)
                      }
                    >
                      테스트 수정
                    </button>
                    <button
                      type="button"
                      name="delete_text"
                      onClick={(e) => btnClickHandler(e, msg.chatguid, msg.userCode)}
                    >
                      테스트 삭제
                    </button>
                  </>
                )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
};

export default Test;