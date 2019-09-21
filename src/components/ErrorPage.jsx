import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

class ErrorPage extends React.Component {
  render() {
    const history = this.props.history;

    return (
      <div>
        <Dialog open={true}>
          <DialogTitle>{"Error 404: Page not found"}</DialogTitle>
          <DialogContent>
            <DialogContentText>The requested page does not exist.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => history.push("/")} color="secondary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ErrorPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(ErrorPage);
