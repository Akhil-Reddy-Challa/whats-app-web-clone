import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { auth } from "../services/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 500,
    },
  },
}));
function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleLogin = (event) => {
    // console.log("Checking", email, password);
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((msg) => {
        const { displayName, uid } = msg.user;
        // Set Auth token
        setAuthToken({ displayName, uid });
        history.push("/home");
        // history.push({
        //   pathname: "/home",
        //   email: email,
        //   username: username,
        //   userId: userId,
        // });
      })
      .catch((err) => alert(err.message));
  };
  const setAuthToken = (data) => {
    // console.log("creating token: ", data);
    sessionStorage.setItem("user_token_created_on", new Date());
    sessionStorage.setItem("userId", data.uid);
    sessionStorage.setItem("username", data.displayName);
    sessionStorage.setItem("email", email);
  };
  return (
    <form className={classes.root}>
      <div>
        <TextField
          label="Email"
          value={email}
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        variant="contained"
        className="login__submit__button"
        color="primary"
        disabled={!email || !password}
        onClick={(e) => handleLogin(e)}
        type="submit"
      >
        Sign In
      </Button>
    </form>
  );
}
export default Login;
