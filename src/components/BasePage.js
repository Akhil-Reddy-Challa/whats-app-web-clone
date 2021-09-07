import React from "react";
import "./styles/BasePage.css";

function BasePage(props) {
  const { username } = props;
  return (
    <div className="basepage">
      <div className="basepage__introImg"></div>
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
            rel="noopener noreferrer"
            href="https://github.com/AkhilReddy1998/whats-app-web-clone"
          >
            GitHub
          </a>
        </p>
      </div>
      <div className="bottomLine"></div>
    </div>
  );
}

export default BasePage;
