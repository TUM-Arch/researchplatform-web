import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router";
import {Button} from "@material-ui/core";

function login(history) {
  sessionStorage.setItem("userid", "tempuser");
  history.push("/");
}

class LoginPage extends React.Component {
  render() {
    const history = this.props.history;
    console.log(history);
    return (
      <div>
        <Button variant="contained" color="secondary" onClick={() => login(history)}>
          Login
        </Button>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(LoginPage);
