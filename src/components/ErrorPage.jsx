import React from "react";
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
    return (
      <div>
        <Dialog
          open="true"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Error 404: Page not found"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The requested page does not exist. Please try again later.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.history.push("/main")} color="secondary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ErrorPage;
