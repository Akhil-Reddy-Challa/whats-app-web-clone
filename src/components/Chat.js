import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { Avatar } from "@material-ui/core";
import AttachFileTwoToneIcon from "@material-ui/icons/AttachFileTwoTone";
import SendIcon from "@material-ui/icons/Send";
import ChatPlayGround from "./ChatPlayGround";

function Chat(props) {
  // console.log(props);
  const fakeMessages = [
    { id: "1254", person: "Hello" },
    { id: "1255", you: "hi" },
    { id: "1255", person: "How are you" },
    { id: "1256", you: "Good" },
    { id: "1257", you: "How about you?" },
    { id: "1258", person: "Great!!, happy for you" },
    { id: "124545", you: "Let us catch up tmrw?" },
    { id: "1212", person: "Sure!" },
    { id: "1241", person: "5PM NYC drive?" },
    { id: "1242", you: "Sounds good" },
    { id: "12543", you: "Will reach your home by 2PM" },
    { id: "1244", person: "Cool!! Excited" },
  ];
  const { username, useravatar } = props;
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState(fakeMessages);

  const postMessage = (event) => {
    event.preventDefault();
    // console.log("Postinggg...", message);
    const msgs = [...messages];
    msgs.push({ you: message });
    setMessages(msgs);
    setMessage("");
  };
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    // console.log("Invoked");
    scrollToBottom();
    setMessages(messages);
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat__header">
        <header className="chat__header__image">
          <Avatar
            className="chat__header__avatar"
            alt={useravatar}
            src="/static/images/avatar/1.jpg"
          />
          <h5>{username}</h5>
        </header>
      </div>
      {/* Header with avatar & name */}
      <div className="chat__ground">
        <ChatPlayGround chatHistory={messages} />
        {/* Responsible for showing the recent most message */}
        <div ref={messagesEndRef} />
      </div>
      {/* Chat history block */}
      <div className="footer">
        <footer>
          <form className="chat__footer" onSubmit={(e) => postMessage(e)}>
            <AttachFileTwoToneIcon
              className="chat__footer__fileupload"
              fontSize="medium"
            />
            <input
              type="text"
              className="chat__footer__messageInput"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            {message && (
              <SendIcon
                fontSize="medium"
                className="chat__footer__messageSend"
              />
            )}
          </form>
        </footer>
      </div>
      {/* Footer with text box & send btn */}
    </div>
  );
}

export default Chat;
