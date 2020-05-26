import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import {ThemeProvider} from "@material-ui/styles";
import theme from "./theme/index";
import UserPage from "./components/UserPage";
import SettingsPage from "./components/SettingsPage";
import ErrorPage from "./components/ErrorPage";
import LoginPage from "./components/LoginPage";
import AuthUser from "./components/AuthUser";
import AuthAdmin from "./components/AuthAdmin";

function App() {
  const history = createBrowserHistory();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              AuthAdmin() ? (
                <UserPage history={history} />
              ) : AuthUser() ? (
                <UserPage history={history} />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            exact
            path="/manage"
            render={() =>
              AuthAdmin() ? <SettingsPage history={history} /> : <LoginPage />
            }
          />
          <Route exact path="/error" render={() => <ErrorPage history={history} />} />
          <Route path="*" render={() => <ErrorPage history={history} />} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
