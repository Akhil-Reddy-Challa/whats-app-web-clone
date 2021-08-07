import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import { Send, Search, AttachFileTwoTone, MoreVert } from "@material-ui/icons";
import { db } from "../services/firebase";
import firebase from "firebase";

function Chat(props) {
  const { currentUserID } = props;
  const { friendName, friendUID } = props.friendInfo;
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const postMessage = (event) => {
    event.preventDefault();
    // console.log("Postinggg...", message);
    const messageObj = {
      content: message,
      senderID: currentUserID,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const msgRef = db
      .collection("users")
      .doc(currentUserID)
      .collection("chats")
      .doc(friendUID)
      .collection("messages");
    msgRef.add(messageObj);
    setMessage("");
  };
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
    // setMessages(messages);
  }, [messages]);

  useEffect(() => {
    // Fetch chat history
    async function fetchRecords() {
      function getMiniTime(time) {
        if (time) {
          const minifiedTime = time.toDate().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });
          const minifiedDate = time.toDate().toLocaleDateString();
          const final = minifiedTime.concat(" ").concat(minifiedDate);
          return final;
        }
        return time;
      }
      let msgsRef = db
        .collection("users")
        .doc(currentUserID)
        .collection("chats")
        .doc(friendUID)
        .collection("messages")
        .orderBy("timestamp", "asc");
      msgsRef.onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          const data = {
            msgID: doc.id,
            content: doc.data().content,
            senderID: doc.data().senderID,
            timestamp: getMiniTime(doc.data().timestamp),
          };
          return data;
        });
        setMessages(messages);
      });
    }
    fetchRecords();
  }, [friendUID, currentUserID]);

  return (
    <div className="chat">
      <header className="chat__header">
        <Avatar
          className="chat__header__avatar"
          alt={friendName}
          src={`https://avatars.dicebear.com/api/initials/${friendName}.svg?background=%230000ff`}
        />
        <h5>{friendName}</h5>
        <div className="chat__header__chatInfo">
          <Tooltip title="Chat Search">
            <IconButton aria-label="chatSearchIcon">
              <Search color="action" />
            </IconButton>
          </Tooltip>
          <Tooltip title="More Info">
            <IconButton aria-label="chatInfoIcon">
              <MoreVert color="action" />
            </IconButton>
          </Tooltip>
        </div>
      </header>
      {/* Header with avatar & name */}
      <div className="chat__ground">
        {messages.map((message) => (
          <div key={message.msgID} className="chat__message__body">
            <p
              className={
                message.senderID === currentUserID
                  ? "chat__message chat__sender "
                  : "chat__message chat__reciever"
              }
            >
              {message.content}
              <span className="chat__message__timestamp">
                {message.timestamp}
              </span>
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
            <AttachFileTwoTone
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
              <Send
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
