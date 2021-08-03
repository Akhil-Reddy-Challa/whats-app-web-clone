import React from "react";
import "./ChatPlayGround.css";
function ChatPlayGround(props) {
  const { chatHistory } = props;
  console.log(chatHistory);

  return (
    <div className="chatground">
      {chatHistory.map((message) => (
        <div key={message.id} className="messagebody">
          {message.person ? (
            <div>
              <span className="personmessage">{message.person}</span>
            </div>
          ) : (
            <div>
              <span className="yourmessage">{message.you}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ChatPlayGround;
