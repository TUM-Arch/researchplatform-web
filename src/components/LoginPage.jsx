import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router";
import {withStyles} from "@material-ui/styles";
import {Button} from "@material-ui/core";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

function login(history) {
  sessionStorage.setItem("userId", "tempuser");
  history.push("/");
}

class LoginPage extends React.Component {
  render() {
    const {classes, history} = this.props;
    return (
      <div className={classes.root}>
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

export default withStyles(styles, {withTheme: true})(withRouter(LoginPage));
