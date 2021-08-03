import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar } from "@material-ui/core";
import AttachFileTwoToneIcon from "@material-ui/icons/AttachFileTwoTone";
import SendIcon from "@material-ui/icons/Send";
import ChatPlayGround from "./ChatPlayGround";

function Chat(props) {
  // console.log(props);
  const fakeMessages = [
    { person: "Hello" },
    { you: "hi" },
    { person: "How are you" },
    { you: "Good" },
    { you: "How about you?" },
    { person: "Great!!, happy for you" },
    { you: "Let us catch up tmrw?" },
    { person: "Sure!" },
    { person: "5PM NYC drive?" },
    { you: "Sounds good" },
    { you: "Will reach your home by 2PM" },
    { person: "Cool!! Excited" },
  ];
  const { username, useravatar } = props;
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState(fakeMessages);

  const postMessage = (event) => {
    event.preventDefault();
    console.log("Postinggg...", message);
    const msgs = [...messages];
    msgs.push({ you: message });
    setMessages(msgs);
    setMessage("");
  };
  useEffect(() => {
    console.log("Invoked");
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
