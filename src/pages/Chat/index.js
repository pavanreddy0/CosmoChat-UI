import React, { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

import "./index.css";

const API_KEY = process.env.REACT_APP_DIV_CHAT_GPT_API_KEY;
const CHAT_GPT = "ChatGPT";
const CHAT_GPT_VERSION = "gpt-3.5-turbo";
const CHAT_GPT_API_URL = "https://api.openai.com/v1/chat/completions";
const CONTENT_TYPE = "application/json";

const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    "Explain things like you're talking to a software professional with 2 years of experience.",
};

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: CHAT_GPT,
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  const processMessageToChatGPT = async (messages) => {
    console.log("processMessageToChatGPT");
    const apiMessages = messages.map((messageObject) => ({
      role:
        messageObject.sender === CHAT_GPT ? "assistant" : messageObject.sender,
      content: messageObject.message,
    }));
    console.log("apiMessages ", apiMessages);
    const requesrtBody = {
      model: CHAT_GPT_VERSION,
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await fetch(CHAT_GPT_API_URL, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + API_KEY,
          "Content-Type": CONTENT_TYPE,
        },
        body: JSON.stringify(requesrtBody),
      });

      const data = await response.json();
      console.log("response json ", data);
      setMessages([
        ...messages,
        {
          message: data.choices[0].message.content,
          sender: "ChatGPT",
        },
      ]);
    } catch (error) {
      console.log("Unkown error occured", error?.message);
    } finally {
      setMessages(messages);
      setIsTyping(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        {console.log("API Key: " + API_KEY)}
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="ChatGPT is Typing" />
                ) : null
              }
            >
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default Chat;
