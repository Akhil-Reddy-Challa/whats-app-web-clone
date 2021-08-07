import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { Avatar } from "@material-ui/core";
import AttachFileTwoToneIcon from "@material-ui/icons/AttachFileTwoTone";
import SendIcon from "@material-ui/icons/Send";
import { db } from "../services/firebase";
import firebase from "firebase";

function Chat(props) {
  // console.log(props);
  const { currentUserID } = props;
  const { friendName, friendUID } = props.friendInfo;
  // console.log("Displaying chat history of ", personUID);
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const postMessage = (event) => {
    event.preventDefault();
    // console.log("Postinggg...", message);
    const msgRef = db
      .collection("users")
      .doc(currentUserID)
      .collection("chats")
      .doc(friendUID)
      .collection("messages");
    msgRef.add({
      content: message,
      senderID: currentUserID,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessage("");
    // setMessages(msgs);
  };
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
    setMessages(messages);
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
          return minifiedTime;
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
        // console.log(messages);
        setMessages(messages);
      });
    }
    fetchRecords();
  }, [friendUID]);

  return (
    <div className="chat">
      <header className="chat__header">
        <Avatar
          className="chat__header__avatar"
          alt={friendName}
          src={`https://avatars.dicebear.com/api/initials/${friendName}.svg?background=%230000ff`}
        />
        <h5>{friendName}</h5>
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
