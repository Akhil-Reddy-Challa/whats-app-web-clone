import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import {
  Send,
  Search,
  AttachFileTwoTone,
  MoreVert,
  EmojiEmotionsOutlined,
} from "@material-ui/icons";
import { db } from "../services/firebase";
import firebase from "firebase";
import Picker from "emoji-picker-react";

function Chat(props) {
  const { currentUserID } = props;
  const { friendName, friendUID } = props.friendInfo;
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [emojiBoard, setEmojiBoard] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message.concat(emojiObject.emoji));
  };
  const postMessage = (event) => {
    event.preventDefault();
    // console.log("Postinggg...", message);
    const messageObj = {
      content: message,
      senderID: currentUserID,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    // Check if this is a new conversation
    // Post msg on current user db
    db.collection("usersChatInfo")
      .doc(currentUserID)
      .collection("chats")
      .doc(friendUID)
      .collection("messages")
      .add(messageObj);
    // Post msg on the person's db
    db.collection("usersChatInfo")
      .doc(friendUID)
      .collection("chats")
      .doc(currentUserID)
      .collection("messages")
      .add(messageObj);
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
        .collection("usersChatInfo")
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
        {emojiBoard && (
          <div className="emojiBoard">
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        )}
        {/* Responsible for showing the recent most message */}
        <div ref={messagesEndRef} />
      </div>
      {/* Chat history block */}

      <div className="footer">
        <footer>
          <form className="chat__footer" onSubmit={(e) => postMessage(e)}>
            <Tooltip title="Emoji Icon Picker">
              <IconButton
                aria-label="emojiPicker"
                color={emojiBoard ? "secondary" : "default"}
                onClick={() => setEmojiBoard(!emojiBoard)}
              >
                <EmojiEmotionsOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title="File Picker">
              <IconButton aria-label="filePicker">
                <AttachFileTwoTone className="chat__footer__fileupload" />
              </IconButton>
            </Tooltip>
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
              <IconButton aria-label="storyIcon">
                <Send type="submit" className="chat__footer__messageSend" />
              </IconButton>
            )}
          </form>
        </footer>
      </div>
      {/* Footer with text box & send btn */}
    </div>
  );
}

export default Chat;
