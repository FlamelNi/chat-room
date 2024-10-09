import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import { Chat } from "./chat/Chat";
import { Login } from "./login/Login";

const enum PAGE {
  LOGIN,
  CHAT,
}

function App() {
  const [page, setPage] = useState(PAGE.LOGIN);
  return (
    <>
      {page == PAGE.LOGIN ? (
        <Login
          login_success={() => {
            setPage(PAGE.CHAT);
          }}
        />
      ) : page == PAGE.CHAT ? (
        <Chat />
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
