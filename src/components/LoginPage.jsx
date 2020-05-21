import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {Button, TextField} from "@material-ui/core";
import {attemptLogin} from "../reducers/loginPage";
import {changeUserId, changePassword} from "../actions/loginPage";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

class LoginPage extends React.Component {
  render() {
    const {
      classes,
      history,
      selectedUserId,
      selectedPassword,
      attemptLogin,
      changeUserId,
      changePassword,
    } = this.props;
    function changeUserIdHandler(value) {
      changeUserId(value);
    }
    function changePasswordHandler(value) {
      changePassword(value);
    }
    function attemptLoginHandler(userId, password) {
      attemptLogin(userId, password);
      //   .then(history.push("/"))
      //   .then(window.location.reload());
    }
    return (
      <div className={classes.root}>
        <TextField
          margin="dense"
          id="userId"
          label="User Id"
          type="text"
          variant="outlined"
          value={selectedUserId}
          onChange={evt => {
            changeUserIdHandler(evt.target.value);
          }}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          value={selectedPassword}
          onChange={evt => {
            changePasswordHandler(evt.target.value);
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => attemptLoginHandler(selectedUserId, selectedPassword)}
        >
          Login
        </Button>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
};

const mapStateToProps = ({loginPage: {selectedUserId, selectedPassword}}) => ({
  selectedUserId,
  selectedPassword,
});

const mapDispatchToProps = {
  attemptLogin: attemptLogin,
  changeUserId: changeUserId,
  changePassword: changePassword,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(LoginPage));
