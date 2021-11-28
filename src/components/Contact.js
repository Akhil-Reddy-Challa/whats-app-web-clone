import React from "react";
import "../styles/Contact.css";
import { Avatar } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core";
import GlobalState from "../contexts/GlobalState";

const useStyles = makeStyles((theme) => ({
  large: {
    margin: "10px 15px 0px 13px",
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));
function Contact({
  username,
  onClick,
  avatar,
  lastSeen,
  recentMessage,
  isRecentMessageSender,
  unReadMessagesCount,
}) {
  const unReadMessagesExist = isRecentMessageSender && unReadMessagesCount > 0;
  const classes = useStyles();
  const [isNightThemeToggled] = React.useContext(GlobalState);
  return (
    <div
      className={"contact "
        .concat(
          unReadMessagesExist ? "contact__when__unReadMessagesExist " : ""
        )
        .concat(isNightThemeToggled ? "contact__nightTheme " : "")}
      onClick={onClick}
      tabIndex="1"
    >
      <Avatar src={avatar} className={classes.large} />
      <table
        className={"contact__information ".concat(
          isNightThemeToggled ? "contact__information__nightTheme" : ""
        )}
      >
        <tbody>
          <tr>
            <td colSpan="2" className="contact__name textWrap">
              {username}
            </td>
            <td
              className={"contact__lastSeen textWrap "
                .concat(
                  isNightThemeToggled ? "contact__lastSeen__nightTheme " : ""
                )
                .concat(
                  unReadMessagesExist
                    ? "contact__lastSeen__when__unreadMessage ".concat(
                        isNightThemeToggled
                          ? "contact__lastSeen__when__unreadMessage__nightTheme "
                          : ""
                      )
                    : ""
                )}
              //
            >
              {lastSeen}
            </td>
          </tr>

          <tr className="secondRow">
            <td
              colSpan="2"
              className={"contact__recentMessage textWrap "
                .concat(
                  unReadMessagesExist
                    ? "contact__recentMessage__when__unreadMessage ".concat(
                        isNightThemeToggled
                          ? "contact__recentMessage__when__unreadMessage__nightTheme "
                          : ""
                      )
                    : ""
                )
                .concat(
                  isNightThemeToggled
                    ? "contact__recentMessage__nightTheme"
                    : ""
                )}
            >
              {recentMessage}
            </td>
            {unReadMessagesExist && (
              <td className="contact__unReadMessagesCount">
                <Badge
                  badgeContent={unReadMessagesCount}
                  className={"contact__unReadMessagesCount__badge ".concat(
                    isNightThemeToggled
                      ? "contact__unReadMessagesCount__badge__nightTheme"
                      : ""
                  )}
                  max={99}
                ></Badge>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default Contact;
