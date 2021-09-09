import React, { useState, useEffect, useRef } from "react";
import "./styles/Chat.css";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import { useCallback } from "react";
function Chat(props) {
  const { email: currentUserEmail } = props;
  const {
    name: friendName,
    email: friendEmail,
    chatRoomID,
    avatar,
    lastSeen,
  } = props.friendInfo;
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [emojiBoard, setEmojiBoard] = useState(false);
  const [loadingAnim, setLoadingAnim] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message.concat(emojiObject.emoji));
  };
  const postMessage = (event) => {
    event.preventDefault();
    // Prevent if message is blank
    if (message.trim().length === 0) return;

    const messageObj = {
      content: message,
      senderID: currentUserEmail,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const chatsRef = db.collection("chats").doc(chatRoomID);
    // Post the new message
    chatsRef.collection("messages").add(messageObj);
    // Update the recent message
    chatsRef.update({ recentMessage: message });
    // Increment unread messages count
    chatsRef.update({
      unReadMessages: firebase.firestore.FieldValue.increment(1),
    });
    // Set Recent message sender
    chatsRef.update({
      recentMessageSender: currentUserEmail,
    });
    setMessage("");
  };
  const clearUnReadMessagesCount = useCallback(() => {
    const chatsRef = db.collection("chats").doc(chatRoomID);
    // Reset unread messages count
    chatsRef.update({
      unReadMessages: 0,
    });
  }, [chatRoomID]);
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.senderID === friendEmail) {
      clearUnReadMessagesCount();
    }
  }, [clearUnReadMessagesCount, messages, friendEmail]);

  useEffect(() => {
    setLoadingAnim(true);
    // Reset messages queue
    setMessages([]);
    setTimeout(() => {
      clearUnReadMessagesCount();
      fetchMessages();
    }, 1000);
    function fetchMessages() {
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
        .collection("chats")
        .doc(chatRoomID)
        .collection("messages")
        .orderBy("timestamp", "asc");

      msgsRef.onSnapshot((snap) => {
        const messages = snap.docs.map((doc) => {
          const data = {
            msgID: doc.id,
            content: doc.data().content,
            senderID: doc.data().senderID,
            timestamp: getMiniTime(doc.data().timestamp),
          };
          return data;
        });
        setMessages(messages);
        setLoadingAnim(false);
      });
    }
  }, [friendEmail, chatRoomID, clearUnReadMessagesCount]);

  return (
    <div className="chat">
      <div className="chat__background__image"></div>
      <header className="chat__header">
        <Avatar
          className="chat__header__avatar"
          alt={friendName}
          src={avatar}
        />
        <div className="chat__header__text">
          <span className="chat__header__friendname">{friendName}</span>
          <span className="chat__header__lastSeen">
            {"Last seen: " + lastSeen}
          </span>
        </div>
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

      <div className="chat__ground">
        {loadingAnim && (
          <div className="chat__ground__loadingScreen">
            <CircularProgress
              size="20px"
              thickness="5.6"
              className="progressbar__color"
            />
          </div>
        )}
        {messages.map((message) => (
          <div key={message.msgID} className="chat__message__body">
            {message.senderID !== currentUserEmail && (
              <span
                className="sender__message__tail"
                data-testid="tail-in"
                data-icon="tail-in"
              >
                <svg viewBox="0 0 8 13" width="8" height="13">
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
            )}
            <div
              className={"chat__message ".concat(
                message.senderID === currentUserEmail
                  ? "currentuser__message"
                  : "sender__message"
              )}
            >
              {message.content}
              <span className="chat__message__timestamp">
                {message.timestamp}
              </span>
            </div>
            {message.senderID === currentUserEmail && (
              <span
                data-testid="tail-out"
                data-icon="tail-out"
                className="currentuser__message__tail"
              >
                <svg viewBox="0 0 8 13" width="8" height="13">
                  <path
                    opacity=".13"
                    d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"
                  ></path>
                </svg>
              </span>
            )}
          </div>
        ))}
        {/* Responsible for showing the recent most message */}
        <div ref={messagesEndRef} />
      </div>

      {emojiBoard && (
        <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} />
      )}

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
              <IconButton aria-label="storyIcon" onClick={postMessage}>
                <Send type="submit" className="chat__footer__messageSend" />
              </IconButton>
            )}
          </form>
        </footer>
      </div>
    </div>
  );
}

export default Chat;
