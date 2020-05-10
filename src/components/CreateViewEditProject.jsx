import React from "react";
import {connect} from "react-redux";
import en from "../translations/en.json";
import de from "../translations/de.json";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {
  projectDialogClose,
  setProjectName,
  setProjectChairName,
  setProjectDescription,
  setProjectImageId,
  setProjectFieldEnValue,
} from "../actions/mainPage";
import {
  createNewProject,
  handleEditProject,
  handleSubmitProject,
} from "../reducers/mainPage";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  textFields: {
    margin: theme.spacing(2),
  },
});

const CustomTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
})(TextField);

function CreateViewEditProject(props) {
  const {
    classes,
    language,
    userId,
    dialogClose,
    isProjectDialogOpen,
    projectDialogState,
    selectedProject,
    createNewProject,
    handleEditProject,
    handlesubmitProject,
    projectName,
    setProjectName,
    projectChairName,
    setProjectChairName,
    projectDescription,
    setProjectDescription,
    projectImageId,
    setProjectImageId,
    setProjectFieldEnValue,
    projectTags,
    projectFields,
  } = props;

  function handleClose() {
    dialogClose();
  }

  function isRequiredFieldsNotFilled() {
    return (
      projectName === "" ||
      projectChairName === "" ||
      projectDescription === "" ||
      projectFields.some(
        projectField => projectField.required === true && projectField.valueEn === ""
      )
    );
  }

  function handleSave() {
    if (isRequiredFieldsNotFilled()) {
      alert("The required fields are empty!!");
    } else {
      if (projectDialogState === "create") {
        createNewProject(
          projectName,
          projectChairName,
          projectDescription,
          projectImageId,
          projectTags,
          projectFields,
          userId
        );
      } else {
        handleEditProject(
          projectName,
          projectChairName,
          projectDescription,
          projectImageId,
          projectTags,
          projectFields,
          userId,
          selectedProject.id
        );
      }
    }
  }

  function handleSubmit() {
    handlesubmitProject(selectedProject.id);
    dialogClose();
  }

  function handleOnChangeEvent(keyName, value) {
    switch (keyName) {
      case "name":
        setProjectName(value);
        break;
      case "description":
        setProjectDescription(value);
        break;
      case "chairName":
        setProjectChairName(value);
        break;
      case "imageId":
        setProjectImageId(value);
        break;
      default:
        setProjectFieldEnValue(keyName, value);
    }
  }

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="md"
        open={isProjectDialogOpen}
        onClose={projectDialogClose}
      >
        <DialogTitle id="form-dialog-title">
          {(() => {
            switch (projectDialogState) {
              case "create":
                return language === "en" ? en.createProject : de.createProject;
              case "edit":
                return language === "en" ? en.editProject : de.editProject;
              case "view":
                return language === "en" ? en.viewProject : de.viewProject;
              default:
                return "";
            }
          })()}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {projectDialogState === "create"
              ? language === "en"
                ? en.newProjectSubtitle
                : de.newProjectSubtitle
              : language === "en"
              ? en.oldProjectSubtitle
              : de.oldProjectSubtitle}
          </DialogContentText>
          {Object.keys(selectedProject).map((keyName, i) => {
            if (
              keyName === "id" ||
              keyName === "createdAt" ||
              keyName === "yearOfCreation"
            ) {
              return null;
            }
            switch (keyName) {
              case "name":
              case "description":
              case "chairName":
              case "imageId":
                return (
                  <div key={i} className={classes.textFields}>
                    <CustomTextField
                      multiline
                      rows={keyName === "description" ? "4" : "1"}
                      label={keyName}
                      defaultValue={
                        projectDialogState === "create" ? "" : selectedProject[keyName]
                      }
                      disabled={projectDialogState === "view" ? true : false}
                      required={keyName === "imageId" ? false : true}
                      variant="outlined"
                      fullWidth
                      onChange={event => {
                        handleOnChangeEvent(keyName, event.target.value);
                      }}
                    />
                  </div>
                );
              case "fields":
                return (
                  <div key={i}>
                    {Object.keys(projectFields).map(j => {
                      return (
                        <div key={j} className={classes.textFields}>
                          <CustomTextField
                            label={projectFields[j].nameEn}
                            defaultValue={projectFields[j].valueEn}
                            required={projectFields[j].required}
                            disabled={projectDialogState === "view" ? true : false}
                            inputProps={{maxLength: projectFields[j].length}}
                            variant="outlined"
                            fullWidth
                            onChange={event => {
                              handleOnChangeEvent(
                                projectFields[j].id,
                                event.target.value
                              );
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              default:
                return null;
            }
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            {language === "en" ? en.cancel : de.cancel}
          </Button>
          {projectDialogState !== "view" ? (
            <Button onClick={() => handleSave()} color="secondary" variant="outlined">
              {language === "en" ? en.save : de.save}
            </Button>
          ) : null}
          {projectDialogState === "view" ? (
            <Button
              onClick={handleSubmit}
              color="secondary"
              variant="contained"
              disabled={selectedProject.status === "NOTSUBMITTED" ? false : true}
            >
              {language === "en" ? en.submit : de.submit}
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = ({
  mainPage: {
    userId,
    isProjectDialogOpen,
    projectDialogState,
    allProjects,
    selectedProject,
    projectName,
    projectChairName,
    projectDescription,
    projectImageId,
    projectTags,
    projectFields,
  },
}) => ({
  userId,
  isProjectDialogOpen,
  projectDialogState,
  allProjects,
  selectedProject,
  projectName,
  projectChairName,
  projectDescription,
  projectImageId,
  projectTags,
  projectFields,
});

const mapDispatchToProps = {
  dialogClose: projectDialogClose,
  createNewProject: createNewProject,
  handleEditProject: handleEditProject,
  handlesubmitProject: handleSubmitProject,
  setProjectName: setProjectName,
  setProjectChairName: setProjectChairName,
  setProjectDescription: setProjectDescription,
  setProjectImageId: setProjectImageId,
  setProjectFieldEnValue: setProjectFieldEnValue,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(CreateViewEditProject));
