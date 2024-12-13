import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function GoogleAuthRedirect(props) {
  // 부모 창에 메시지 전달
  window.opener.postMessage({ action: "refresh" }, "*");

  // 팝업 창 닫기
  window.close();

  return <div />;
}


export default GoogleAuthRedirect;