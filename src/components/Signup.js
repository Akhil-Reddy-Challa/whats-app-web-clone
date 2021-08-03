import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Signup.css";
import { auth } from "../services/firebase";

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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (event) => {
    event.preventDefault();
    // console.log("Checking", email, password);
    // console.log("Sign up module");
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        // console.log(authUser);
        authUser.user.updateProfile({
          displayName: username,
        });
        // history.push({
        //   pathname: "/home",
        //   email: email,
        //   username: username,
        // });
        window.location.reload();
        return;
      })
      .catch((err) => alert(err.message));
  };

  return (
    <form className={classes.root}>
      <div>
        <TextField
          label="Username"
          variant="filled"
          color="primary"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Email"
          variant="filled"
          color="primary"
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
        disabled={!email || !password || !username}
      >
        Sign Up
      </Button>
    </form>
  );
}
