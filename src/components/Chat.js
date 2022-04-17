import React, { useState, useEffect, useRef } from "react";
import "../styles/Chat.css";
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
import Message from "./Message";
import GlobalState from "../contexts/GlobalState";

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
  const [isNightThemeToggled] = React.useContext(GlobalState);

  const prevScrollY = useRef(0);
  const [goingUp, setGoingUp] = useState(false);

  const onScroll = (e) => {
    const currentScrollY = e.target.scrollTop;
    if (prevScrollY.current < currentScrollY && goingUp) {
      setGoingUp(false);
    }
    if (prevScrollY.current > currentScrollY && !goingUp) {
      setGoingUp(true);
    }
    prevScrollY.current = currentScrollY;
    const reachedTop = goingUp && currentScrollY === 0;
    if (reachedTop) console.log("Fetch more messages");
  };

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
    let unsubscribe;
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
        .orderBy("timestamp", "asc")
        .limitToLast(20);
      unsubscribe = msgsRef.onSnapshot((snap) => {
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
    return () => {
      setMessages([]);
      unsubscribe && unsubscribe();
    };
  }, [friendEmail, chatRoomID, clearUnReadMessagesCount]);

  return (
    <div className="chat">
      <div
        className={"chat__background__image ".concat(
          isNightThemeToggled ? "chat__background__image__nightTheme" : ""
        )}
      />
      <header
        className={"chat__header ".concat(
          isNightThemeToggled ? "chat__header__nightTheme" : ""
        )}
      >
        <Avatar
          className="chat__header__avatar"
          alt={friendName}
          src={avatar}
        />
        <div className="chat__header__text">
          <span className="chat__header__friendname">{friendName}</span>
          <span
            className={"chat__header__lastSeen ".concat(
              isNightThemeToggled ? "chat__header__lastSeen__nightTheme" : ""
            )}
          >
            {"Last seen: " + lastSeen}
          </span>
        </div>
        <div className="chat__header__chatInfo">
          <Tooltip title="Chat Search">
            <IconButton aria-label="chatSearchIcon">
              <Search
                className={"chatSearchIcon ".concat(
                  isNightThemeToggled ? "nightModeIcon" : ""
                )}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="More Info">
            <IconButton aria-label="chatInfoIcon">
              <MoreVert
                className={"chatInfoIcon ".concat(
                  isNightThemeToggled ? "nightModeIcon" : ""
                )}
              />
            </IconButton>
          </Tooltip>
        </div>
      </header>
      <div
        className={"chat__ground ".concat(
          isNightThemeToggled ? "chat__ground__nightTheme" : ""
        )}
        onScroll={onScroll}
      >
        {loadingAnim && (
          <div className="chat__ground__loadingScreen">
            <CircularProgress
              size="20px"
              thickness={5.6}
              className="progressbar__color"
            />
          </div>
        )}
        {messages.map((message) => (
          <Message
            key={message.msgID}
            message={message}
            currentUserEmail={currentUserEmail}
          />
        ))}
        {/* Responsible for showing the recent most message */}
        <div ref={messagesEndRef} />
      </div>
      {emojiBoard && (
        <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} />
      )}
      <div className="footer">
        <footer>
          <form
            className={"chat__footer ".concat(
              isNightThemeToggled ? "chat__footer__nightTheme" : ""
            )}
            onSubmit={(e) => postMessage(e)}
          >
            <Tooltip title="Emoji Icon Picker">
              <IconButton
                aria-label="emojiPicker"
                color={emojiBoard ? "secondary" : "default"}
                onClick={() => setEmojiBoard(!emojiBoard)}
              >
                <EmojiEmotionsOutlined
                  className={isNightThemeToggled ? "nightModeIcon" : ""}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="File Picker">
              <IconButton aria-label="filePicker">
                <AttachFileTwoTone
                  className={"chat__footer__fileupload ".concat(
                    isNightThemeToggled ? "nightModeIcon" : ""
                  )}
                />
              </IconButton>
            </Tooltip>
            <input
              type="text"
              className={"chat__footer__messageInput ".concat(
                isNightThemeToggled
                  ? "chat__footer__messageInput__nightTheme"
                  : ""
              )}
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            {message && (
              <IconButton aria-label="storyIcon" onClick={postMessage}>
                <Send
                  type="submit"
                  className={isNightThemeToggled ? "nightModeIcon" : ""}
                />
              </IconButton>
            )}
          </form>
        </footer>
      </div>
    </div>
  );
}

export default Chat;
