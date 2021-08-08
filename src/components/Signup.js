import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Signup.css";
import { auth, db } from "../services/firebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 500,
    },
  },
}));
export default function Signup() {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (event) => {
    event.preventDefault();
    // console.log("Checking", email, password);
    // console.log("Sign up module");
    console.log(username, email, password);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username,
        });
        setAuthToken(authUser);
        // Push data to usersInfo Collection
        db.collection("usersInfo").doc(email).set({
          UID: authUser.user.uid,
          name: username,
        });
        history.push("/home");
      })
      .catch((err) => alert(err.message));
  };
  const setAuthToken = (dataToken) => {
    // console.log("creating token: ", data);
    const userId = dataToken.user.uid;
    sessionStorage.setItem("user_token_created_on", new Date());
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("email", email);
  };
  return (
    <form className={classes.root}>
      <div>
        <TextField
          label="Username"
          variant="filled"
          color="primary"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Email"
          variant="filled"
          color="primary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Password"
          variant="filled"
          color="primary"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        onClick={(e) => handleSignup(e)}
        variant="contained"
        className="signup__submit__button"
        color="primary"
        type="submit"
        disabled={!email || !password || !username}
      >
        Sign Up
      </Button>
    </form>
  );
}
