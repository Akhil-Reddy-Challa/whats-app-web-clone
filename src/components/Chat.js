import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { Avatar } from "@material-ui/core";
import AttachFileTwoToneIcon from "@material-ui/icons/AttachFileTwoTone";
import SendIcon from "@material-ui/icons/Send";

function Chat(props) {
  // console.log(props);
  const fakeMessages = [
    { id: "1254", content: "Hello", sender: "M9zQgqcsPpRbwU1v5gpDeolUULs2" },
    { id: "1255", content: "hi", sender: "ZoWnHxokGYNYf5yC4rHKk2mUrfY2" },
    {
      id: "12155",
      content: "How are you",
      sender: "M9zQgqcsPpRbwU1v5gpDeolUULs2",
    },
    { id: "1256", content: "Good", sender: "ZoWnHxokGYNYf5yC4rHKk2mUrfY2" },
    {
      id: "1257",
      content: "How about you?",
      sender: "M9zQgqcsPpRbwU1v5gpDeolUULs2",
    },
    {
      id: "1258",
      content: "Great!!, happy for you",
      sender: "ZoWnHxokGYNYf5yC4rHKk2mUrfY2",
    },
    {
      id: "124545",
      content: "Let us catch up tmrw?",
      sender: "M9zQgqcsPpRbwU1v5gpDeolUULs2",
    },
    { id: "1212", content: "Sure!", sender: "M9zQgqcsPpRbwU1v5gpDeolUULs2" },
    {
      id: "1241",
      content: "5PM NYC drive?",
      sender: "ZoWnHxokGYNYf5yC4rHKk2mUrfY2",
    },
    {
      id: "1242",
      content: "Sounds good",
      sender: "M9zQgqcsPpRbwU1v5gpDeolUULs2",
    },
    {
      id: "12543",
      content: "Will reach your home by 2PM",
      sender: "ZoWnHxokGYNYf5yC4rHKk2mUrfY2",
    },
    {
      id: "1244",
      content: "Cool!! Excited",
      sender: "M9zQgqcsPpRbwU1v5gpDeolUULs2",
    },
  ];
  const { username, useravatar } = props;
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState(fakeMessages);

  const postMessage = (event) => {
    event.preventDefault();
    // console.log("Postinggg...", message);
    const msgs = messages.slice();
    msgs.push({ you: message });
    setMessage("");
    setMessages(msgs);
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
      <header className="chat__header">
        <Avatar
          className="chat__header__avatar"
          alt={useravatar}
          src={`https://avatars.dicebear.com/api/initials/${username}.svg?background=%230000ff`}
        />
        <h5>{username}</h5>
      </header>
      {/* Header with avatar & name */}
      <div className="chat__ground">
        {messages.map((message) => (
          <div className="chat__message__body">
            <span data-testid="tail-in" data-icon="tail-in" className="_3nrYb">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 8 13"
                width="8"
                height="13"
              >
                <path
                  opacity=".13"
                  fill="#0000000"
                  d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"
                ></path>
                <path
                  fill="currentColor"
                  d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"
                ></path>
              </svg>
            </span>
            <p className="chat__message chat__sender">{message.content}</p>
          </div>
        ))}

        {/* <p className="chat__message chat__reciever">Hello</p>
        <p className="chat__message chat__sender">How are you</p>
        <p className="chat__message chat__reciever">Good</p> */}
      </div>
      {/* Responsible for showing the recent most message */}
      <div ref={messagesEndRef} />

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
