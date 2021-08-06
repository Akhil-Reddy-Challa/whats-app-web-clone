import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { Avatar } from "@material-ui/core";
import AttachFileTwoToneIcon from "@material-ui/icons/AttachFileTwoTone";
import SendIcon from "@material-ui/icons/Send";
import { firebase } from "../services/firebase";

function Chat(props) {
  // console.log(props);
  const { id: personUID, username: personName } = props.person;
  const { currentUID } = props;
  // console.log("Displaying chat history of ", personUID);
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);

  const postMessage = (event) => {
    event.preventDefault();
    // console.log("Postinggg...", message);
    const msgs = messages.slice();
    msgs.push({
      id: Date.now(),
      content: message,
      senderID: currentUID,
    });
    setMessage("");
    setMessages(msgs);
  };
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
    setMessages(messages);
  }, [messages]);
  useEffect(() => {
    const fakeMessages = [
      {
        id: "1254",
        content: "Hello",
        senderID: "jOJpmz6s0xVz86npV8KrmJnYnFy2",
      },
      { id: "1255", content: "hi", senderID: "dAmZ6pW8CXPy4Dff2zJDxUqMy973" },
      {
        id: "12155",
        content: "How are you",
        senderID: "jOJpmz6s0xVz86npV8KrmJnYnFy2",
      },
      {
        id: "1256",
        content: "Good",
        senderID: "dAmZ6pW8CXPy4Dff2zJDxUqMy973",
      },
      {
        id: "1257",
        content: "How about you?",
        senderID: "dAmZ6pW8CXPy4Dff2zJDxUqMy973",
      },
      {
        id: "1258",
        content: "Great!!, happy for you",
        senderID: "jOJpmz6s0xVz86npV8KrmJnYnFy2",
      },
      {
        id: "124545",
        content: "Let us catch up tmrw?",
        senderID: "dAmZ6pW8CXPy4Dff2zJDxUqMy973",
      },
      {
        id: "1212",
        content: "Sure!",
        senderID: "jOJpmz6s0xVz86npV8KrmJnYnFy2",
      },
      {
        id: "1241",
        content: "5PM NYC drive?",
        senderID: "dAmZ6pW8CXPy4Dff2zJDxUqMy973",
      },
      {
        id: "1242",
        content: "Sounds good",
        senderID: "jOJpmz6s0xVz86npV8KrmJnYnFy2",
      },
      {
        id: "12543",
        content: "Will reach your home by 2PM",
        senderID: "dAmZ6pW8CXPy4Dff2zJDxUqMy973",
      },
      {
        id: "1244",
        content: "Cool!! Excited",
        senderID: "jOJpmz6s0xVz86npV8KrmJnYnFy2",
      },
    ];
    console.log("Fetched records");
    // Fetch chat history
    setMessages(fakeMessages);
  }, [personName]);

  return (
    <div className="chat">
      <header className="chat__header">
        <Avatar
          className="chat__header__avatar"
          alt={personName}
          src={`https://avatars.dicebear.com/api/initials/${personName}.svg?background=%230000ff`}
        />
        <h5>{personName}</h5>
      </header>
      {/* Header with avatar & name */}
      <div className="chat__ground">
        {messages.map((message) => (
          <div key={message.id} className="chat__message__body">
            <p
              className={
                message.senderID === currentUID
                  ? "chat__message chat__sender "
                  : "chat__message chat__reciever"
              }
            >
              {message.content}
              <span className="chat__message__timestamp">Time</span>
            </p>
          </div>
        ))}
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
                type="submit"
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
