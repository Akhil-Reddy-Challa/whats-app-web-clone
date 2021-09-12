import React from "react";
import "./styles/BasePage.css";
import GlobalState from "../contexts/GlobalState";

function BasePage({ username }) {
  const [isNightThemeToggled] = React.useContext(GlobalState);
  return (
    <div
      className={"basepage ".concat(
        isNightThemeToggled ? "basepage__nightTheme" : ""
      )}
    >
      <div
        className={"basepage__introImg ".concat(
          isNightThemeToggled ? "basepage__introImg__nightTheme" : ""
        )}
      ></div>
      <div className="basepage__text">
        <h1>Hello {username}</h1>
      </div>
      <div>
        <p>View all your chats of the left pane</p>
        <p>
          <strong>Press (+) </strong> to start a new conversation
        </p>
      </div>
      <div className="line__seperator"></div>
      <div className="project__details">
        <p>
          Project available on{" "}
          <a
            target="_blank"
            className={"github__url ".concat(
              isNightThemeToggled ? "github__url__nightTheme" : ""
            )}
            rel="noopener noreferrer"
            href="https://github.com/AkhilReddy1998/whats-app-web-clone"
          >
            GitHub
          </a>
        </p>
      </div>
      <div
        className={"bottomLine ".concat(
          isNightThemeToggled ? "bottomLine__nightTheme" : ""
        )}
      ></div>
    </div>
  );
}
export default BasePage;
