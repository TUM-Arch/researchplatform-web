import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {createBrowserHistory} from "history";
import {ThemeProvider} from "@material-ui/styles";
import theme from "./theme/index";
import MainPage from "./components/MainPage";
import ErrorPage from "./components/ErrorPage";
import LoginPage from "./components/LoginPage";
import Auth from "./components/Auth";

function App() {
  const history = createBrowserHistory();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route
          exact
          path="/"
          render={() => (Auth() ? <MainPage /> : <LoginPage history={history} />)}
        />
        <Route exact path="/error" render={() => <ErrorPage />} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
