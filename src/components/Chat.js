import React, { useState } from "react";
import "./Chat.css";
import { Avatar } from "@material-ui/core";
import AttachFileTwoToneIcon from "@material-ui/icons/AttachFileTwoTone";
import SendIcon from "@material-ui/icons/Send";

function Chat(props) {
  // console.log(props);
  const { username, useravatar } = props;
  const [message, setMessage] = useState();
  const postMessage = () => {
    console.log("Postinggg...", message);
  };
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
      <div className="chat__ground">Chat Area</div>
      {/* Chat history block */}
      <div className="footer">
        <footer className="">
          <form className="chat__footer">
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
                onClick={postMessage}
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
