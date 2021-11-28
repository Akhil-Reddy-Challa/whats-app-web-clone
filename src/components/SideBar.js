import React from "react";
import { useHistory } from "react-router-dom";
import Contact from "./Contact";
import GlobalState from "../contexts/GlobalState";
import "../styles/Sidebar.css";
import {
  List,
  ListItem,
  ListItemText,
  Backdrop,
  Popover,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import { DonutLarge, MoreVert, Add, ArrowBack } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  medium: {
    margin: "0 17px 0 17px",
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

const handleLogout = (history) => {
  sessionStorage.clear();
  history.push("/");
};
function SideBar({
  userAvatar,
  currentUsername,
  friendsList,
  createNewChat,
  showChathistory,
}) {
  const classes = useStyles();
  const [userInfoPopup, setUserInfoPopup] = React.useState(false);
  const [showShortcuts, setShowShortcuts] = React.useState(null);
  const [userSearchText, setUserSearchText] = React.useState("");
  const [isNightThemeToggled, setNightThemeToggle] =
    React.useContext(GlobalState);
  const history = useHistory();
  return (
    <div className="sidebar">
      <div
        className={"sidebar__userbio ".concat(
          isNightThemeToggled ? "sidebar__userbio__nightTheme" : ""
        )}
      >
        <Avatar src={userAvatar} className={classes.medium} />
        <h3 className="sidebar__avatar__username">{currentUsername}</h3>
        <div className="sidebar__userbio__shortCuts">
          <div className="dayAndNightModeToggler">
            <Tooltip title="Toggle Day/Night Mode">
              <IconButton
                onClick={() => setNightThemeToggle(!isNightThemeToggled)}
              >
                {isNightThemeToggled ? (
                  <BrightnessHighIcon style={{ color: "rgb(177, 179, 181)" }} />
                ) : (
                  <Brightness4Icon style={{ color: "rgb(81, 88, 92)" }} />
                )}
              </IconButton>
            </Tooltip>
          </div>
          <Tooltip title="Displays Status">
            <IconButton aria-label="storyIcon">
              <DonutLarge
                className={"storyIcon ".concat(
                  isNightThemeToggled ? "nightModeIcon" : ""
                )}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add New Chat">
            <IconButton aria-label="newChatIcon" onClick={createNewChat}>
              <Add
                className={"newChatIcon ".concat(
                  isNightThemeToggled ? "nightModeIcon" : ""
                )}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Get Your Info">
            <IconButton
              aria-label="userInfoIcon"
              onClick={(e) => setShowShortcuts(e.currentTarget)}
            >
              <MoreVert
                className={"userInfoIcon ".concat(
                  isNightThemeToggled ? "nightModeIcon" : ""
                )}
              />
            </IconButton>
          </Tooltip>
          <Popover
            open={Boolean(showShortcuts)}
            id={Boolean(showShortcuts) ? "simple-popover" : undefined}
            anchorEl={showShortcuts}
            onClose={() => setShowShortcuts(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <List component="nav" aria-label="secondary mailbox folders">
              <ListItem button>
                <ListItemText
                  primary="Profile"
                  onClick={() => {
                    setUserInfoPopup(true);
                    setShowShortcuts(null);
                  }}
                />
              </ListItem>
              <ListItem
                button
                className="listExpander"
                onClick={() => handleLogout(history)}
              >
                <ListItemText primary="Log Out" />
              </ListItem>
            </List>
          </Popover>
          <Backdrop className={classes.backdrop} open={userInfoPopup}>
            <div className="userInfo">
              <div className="userInfo__header">
                <div className="userInfo__prevBtn">
                  <IconButton
                    onClick={() => setUserInfoPopup(false)}
                    aria-label="prevButton"
                  >
                    <ArrowBack style={{ color: "white" }} />
                  </IconButton>
                </div>
                <div className="userInfo__text">Profile</div>
              </div>
              <div className="userInfo__body">
                <div className="userInfo__avatar">
                  <img
                    className="userInfo__image"
                    src={userAvatar}
                    alt="User"
                  />
                </div>
                <p className="userInfo__username">Name: {currentUsername}</p>
                <p className="totalChats">Total Chats: {friendsList?.length}</p>
              </div>
            </div>
          </Backdrop>
        </div>
      </div>

      <div
        className={"sidebar__searchArea ".concat(
          isNightThemeToggled ? "sidebar__searchArea__nightTheme" : ""
        )}
      >
        <div
          className={"searchBox__wrapper ".concat(
            isNightThemeToggled ? "searchBox__wrapper__nightTheme" : ""
          )}
        >
          {userSearchText.length === 0 ? (
            <SearchIcon
              className="searchIcon animate__animated animate__backInLeft"
              fontSize="small"
            />
          ) : (
            <ArrowBack
              onClick={() => setUserSearchText("")}
              className="arrowBack animate__animated animate__backInLeft"
              fontSize="small"
            />
          )}
          <input
            type="search"
            name="searchBox"
            className={"searchBox ".concat(
              isNightThemeToggled ? "searchBox__nightTheme" : ""
            )}
            value={userSearchText}
            onChange={(e) => setUserSearchText(e.target.value)}
            placeholder="Search or start new chat"
          />
        </div>
      </div>

      <div
        className={"sidebar__chats ".concat(
          isNightThemeToggled ? "sidebar__chats__nightTheme" : ""
        )}
      >
        {friendsList.map((friend) => (
          <Contact
            key={friend.email}
            username={friend.name}
            avatar={friend.avatar}
            lastSeen={friend.lastSeen}
            recentMessage={friend.recentMessage}
            isRecentMessageSender={friend.recentMessageSender}
            unReadMessagesCount={friend.unReadMessages}
            onClick={() => showChathistory(friend)}
          />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
