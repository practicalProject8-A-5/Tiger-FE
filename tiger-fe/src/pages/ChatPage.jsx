// eslint-disable-next-line

import React from "react";
import ChatRoom from "../components/chat/ChatRoom";
import GlobalLayout from "../global/GlobalLayout";
import Header from "../global_elements/Header";
import Search from "../global_elements/Search";

const ChatPage = () => {
  return (
    <>
      <Header />
      <Search />
      <GlobalLayout>
        <ChatRoom />
      </GlobalLayout>
    </>
  );
};

export default ChatPage;
