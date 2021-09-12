import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import Landing from "./components/Landing";
import Home from "./components/Home";
import GlobalState from "./contexts/GlobalState";
import ThemeDetector from "./services/ThemeDetector";

const App = () => {
  const checkForAuthToken = () => {
    const tokenExists = sessionStorage.getItem("user_token_created_on");
    return tokenExists ? <Home /> : <Redirect to="/login" />;
  };
  const isNightThemeToggled = ThemeDetector();
  const [, setNightThemeToggle] = React.useState(isNightThemeToggled);
  return (
    <GlobalState.Provider value={[isNightThemeToggled, setNightThemeToggle]}>
      <Router>
        <Switch>
          <Route path="/home" component={() => checkForAuthToken()}></Route>
          <Route path="/" render={Landing}></Route>
        </Switch>
      </Router>
    </GlobalState.Provider>
  );
};
export default App;
