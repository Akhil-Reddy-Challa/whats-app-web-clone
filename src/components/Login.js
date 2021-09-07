import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { auth, db } from "../services/firebase";
import firebase from "firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleLogin = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((msg) => {
        const { displayName } = msg.user;
        // 1) Set Auth token
        setAuthToken(displayName);
        // 2) Update lastSeen in db
        db.collection("users").doc(email).update({
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        });
        // 3) Navigate to home page
        history.push("/home");
      })
      .catch((err) => alert(err.message));
  };
  const setAuthToken = (name) => {
    sessionStorage.setItem("user_token_created_on", new Date());
    sessionStorage.setItem("username", name);
    sessionStorage.setItem("email", email);
  };
  return (
    <form>
      <TextField
        label="Email"
        value={email}
        autoFocus
        fullWidth
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        fullWidth
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        className="login__submit__button"
        variant="outlined"
        disabled={!email || !password}
        onClick={(e) => handleLogin(e)}
        type="submit"
        style={{ marginTop: "10px", color: "#01bfa5" }}
        fullWidth
      >
        Sign In
      </Button>
    </form>
  );
}
export default Login;
