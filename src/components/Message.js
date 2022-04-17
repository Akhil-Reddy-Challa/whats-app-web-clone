import React from "react";
import "../styles/Message.css";
import GlobalState from "../contexts/GlobalState";

const TailOutSVG = ({ isNightTheme }) => {
  const _class = "outgoing__message__tail ".concat(
    isNightTheme ? "outgoing__message__tail__nightTheme" : ""
  );
  return (
    <span data-testid="tail-out" data-icon="tail-out" className={_class}>
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
  );
};
const TailInSVG = ({ isNightTheme }) => {
  const _class = "incoming__message__tail ".concat(
    isNightTheme ? "incoming__message__tail__nightTheme" : ""
  );
  return (
    <span className={_class} data-testid="tail-in" data-icon="tail-in">
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
  );
};
function Message({ message, currentUserEmail }) {
  const isOutMsg = message.senderID === currentUserEmail;
  const [isNightThemeToggled] = React.useContext(GlobalState);
  const _class = "message ".concat(
    isOutMsg
      ? "outgoing__message ".concat(
          isNightThemeToggled ? "outgoing__message__nightTheme" : ""
        )
      : "incoming__message ".concat(
          isNightThemeToggled ? "incoming__message__nightTheme" : ""
        )
  );
  const onlyTime = message.timestamp.split("M")[0] + "M";
  return (
    <div key={message.msgID} className="message__box">
      {!isOutMsg && <TailInSVG isNightTheme={isNightThemeToggled} />}
      <div className={_class}>
        {message.content}
        <span
          className={"message__timestamp ".concat(
            isNightThemeToggled ? "message__timestamp__nightTheme" : ""
          )}
        >
          {onlyTime}
        </span>
      </div>
      {isOutMsg && <TailOutSVG isNightTheme={isNightThemeToggled} />}
    </div>
  );
}

export default Message;
