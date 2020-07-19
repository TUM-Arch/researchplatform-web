import React from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import en from "../translations/en.json";
import de from "../translations/de.json";
import {handleRejectProject} from "../reducers/mainPage";
import {openRejectionDialog} from "../actions/mainPage.js";

function RejectProjectDialog(props) {
  const {
    isRejectionDialogOpen,
    language,
    jwt,
    handleRejectProject,
    openRejectionDialog,
    rejectDialogState,
    selectedProject,
  } = props;
  const [rejectionReason, setRejectionReason] = React.useState("");

  function handleCloseDialog() {
    openRejectionDialog(false);
  }

  function handleRejection() {
    handleRejectProject(selectedProject.id, jwt, rejectionReason);
  }

  return (
    <Dialog
      open={isRejectionDialogOpen}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">
        {rejectDialogState === "view"
          ? language === "en"
            ? en.view + " " + en.rejectReason
            : de.view + " " + de.rejectReason
          : language === "en"
          ? en.rejectProject
          : de.rejectProject}
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="tag"
          disabled={rejectDialogState === "view" ? true : false}
          defaultValue={selectedProject.rejectionText}
          label={language === "en" ? en.rejectReason : de.rejectReason}
          fullWidth
          onChange={event => setRejectionReason(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="secondary">
          {language === "en" ? en.cancel : de.cancel}
        </Button>
        {rejectDialogState === "edit" && (
          <Button onClick={handleRejection} color="secondary">
            {language === "en" ? en.add : de.add}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = ({
  loginPage: {jwt},
  mainPage: {selectedProject, isRejectionDialogOpen, rejectDialogState},
}) => ({
  jwt,
  selectedProject,
  isRejectionDialogOpen,
  rejectDialogState,
});

const mapDispatchToProps = {
  handleRejectProject: handleRejectProject,
  openRejectionDialog: openRejectionDialog,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles({withTheme: true})(RejectProjectDialog));
