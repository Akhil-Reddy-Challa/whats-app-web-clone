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
    <React.Fragment>
      <div className="chat">
        <div className="row chat__header">
          <header className="col chat__header_image">
            <Avatar
              className="chat__header_avatar"
              alt={useravatar}
              src="/static/images/avatar/1.jpg"
            />
            <h5>{username}</h5>
          </header>
        </div>
        {/* Header with avatar & name */}
        <div className="row">
          <div className="col">Chat Area</div>
        </div>
        {/* Chat history block */}
        <div className="row footer">
          <footer className="col">
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
    </React.Fragment>
  );
}

export default Chat;
