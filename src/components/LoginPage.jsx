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

function loginUser(history) {
  sessionStorage.setItem("isAdmin", false);
  history.push("/");
  window.location.reload();
}
function loginAdmin(history) {
  sessionStorage.setItem("isAdmin", true);
  history.push("/");
  window.location.reload();
}

class LoginPage extends React.Component {
  render() {
    const {classes, history} = this.props;
    return (
      <div className={classes.root}>
        <Button variant="contained" color="secondary" onClick={() => loginUser(history)}>
          Login User
        </Button>
        <Button variant="contained" color="secondary" onClick={() => loginAdmin(history)}>
          Login Admin
        </Button>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(withRouter(LoginPage));
