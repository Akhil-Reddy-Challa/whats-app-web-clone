import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Login.css";
import { useHistory } from "react-router-dom";

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
  const handleLogin = () => {
    console.log("Checking", email, password);

    history.push({
      pathname: "/home",
      user: email,
    });
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
        onClick={handleLogin}
      >
        Sign In
      </Button>
    </form>
  );
}
export default Login;
