import React from "react";
import MainPage from "./components/MainPage";
import ErrorPage from "./components/ErrorPage";
import LoginPage from "./components/LoginPage";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {ThemeProvider} from "@material-ui/styles";
import theme from "./theme/index";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route exact path="/" component={LoginPage} />
        <Route path="/main" component={MainPage} />
        <Route path="/error" component={ErrorPage} />
        <Route path="/login" component={LoginPage} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
