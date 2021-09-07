import React from "react";

function ChatPlayGround(props) {
  const { chatHistory } = props;

  return (
    <div className="chatground">
      {chatHistory.map((message) => (
        <div key={message.id} className="messagebox">
          <span className={message.person ? "sender" : "you"}></span>
          {message.person ? (
            <div className="sendermessage">{message.person}</div>
          ) : (
            <div className="yourmessage">{message.you}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ChatPlayGround;
