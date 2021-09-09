import React from "react";
import "./styles/Contact.css";
import { Avatar } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  badge: {
    backgroundColor: "rgb(6, 215, 85)",
    marginRight: "10px",
    fontWeight: "bold",
    color: "white",
    marginTop: "-7px",
  },
  large: {
    margin: "10px 15px 0px 13px",
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));
const getRelativeTime = (timestamp) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;

  let elapsed = Date.now() - timestamp;

  if (elapsed < msPerMinute) return Math.round(elapsed / 1000) + " seconds ago";
  else if (elapsed < msPerHour)
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  else if (elapsed < msPerDay)
    return Math.round(elapsed / msPerHour) + " hours ago";
  else if (elapsed < msPerMonth) {
    const days = Math.round(elapsed / msPerDay);
    if (days === 1) return "1 day ago";
    else if (days < 7) return days + " days ago";
  }
  const date = new Date(timestamp);
  const result = date.toLocaleDateString("en", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  return result;
};
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
  lastSeen = getRelativeTime(lastSeen);
  const classes = useStyles();
  return (
    <div
      className={"contact ".concat(
        unReadMessagesExist ? "contact__when__unReadMessagesExist" : ""
      )}
      onClick={onClick}
      tabIndex="1"
    >
      <Avatar src={avatar} className={classes.large} />
      <table className="contact__information">
        <tbody>
          <tr>
            <td colSpan="2" className="contact__name textWrap">
              {username}
            </td>
            <td
              className={"contact__lastSeen textWrap ".concat(
                unReadMessagesExist
                  ? "contact__lastSeen__when__unreadMessage"
                  : ""
              )}
            >
              {lastSeen}
            </td>
          </tr>

          <tr className="secondRow">
            <td
              colSpan="2"
              className={"contact__recentMessage textWrap ".concat(
                unReadMessagesExist
                  ? "contact__recentMessage__when__unreadMessage"
                  : ""
              )}
            >
              {recentMessage}
            </td>
            {unReadMessagesExist && (
              <td className="contact__unReadMessagesCount">
                <Badge
                  classes={{ badge: classes.badge }}
                  badgeContent={unReadMessagesCount}
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
