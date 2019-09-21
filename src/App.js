import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
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
        <Switch>
          <Route
            exact
            path="/"
            render={() => (Auth() ? <MainPage /> : <LoginPage history={history} />)}
          />
          <Route exact path="/error" render={() => <ErrorPage history={history} />} />
          <Route path="*" render={() => <ErrorPage history={history} />} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
