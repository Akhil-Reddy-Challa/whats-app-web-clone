import React from "react";
import "./Contact.css";
import { Avatar } from "@material-ui/core";

function Contact({
  username,
  onClick,
  avatar,
  lastSeen,
  recentMessage,
  isRecentMessageSender,
  unReadMessagesCount,
}) {
  const unReadMessagesExist = isRecentMessageSender && unReadMessagesCount > 0;
  //console.log("isRecentMessageSender", isRecentMessageSender);
  return (
    <div
      className={"contact ".concat(unReadMessagesExist ? "unReadMessages" : "")}
      onClick={onClick}
      tabIndex="1"
    >
      <Avatar className="contact__avatar" src={avatar} />
      <div className="contact__info">
        <div className="topLayer">
          <div className="name">{username}</div>
          <div className="lastSeen">{lastSeen}</div>
        </div>
        <div className="recentMessageBox">
          <p className="recentMessage">{recentMessage}</p>
          {unReadMessagesExist && (
            <div className="unReadMessagesCount">
              <p>{unReadMessagesCount}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Contact;
