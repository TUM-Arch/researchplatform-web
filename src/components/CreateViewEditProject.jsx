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
  Chip,
  Typography,
} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {
  projectDialogClose,
  setProjectName,
  setProjectChairName,
  setProjectDescription,
  setProjectTag,
  deleteProjectTag,
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
  tags: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    borderColor: "lightgrey",
    borderStyle: "solid",
    borderWidth: "thin",
    borderRadius: theme.spacing(0.5),
    "&:hover": {
      borderColor: "black",
    },
  },
  tagsDisabled: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    borderColor: "lightgrey",
    borderStyle: "solid",
    borderWidth: "thin",
    borderRadius: theme.spacing(0.5),
  },
  tagText: {
    marginTop: "auto",
    marginBottom: "auto",
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  chipDisabled: {
    margin: theme.spacing(0.5),
    color: "lightslategray",
  },
  button: {
    margin: theme.spacing(0.5),
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
    setProjectTag,
    deleteProjectTag,
    setProjectFieldEnValue,
    projectTags,
    projectFields,
  } = props;

  const [openAddTag, setOpenAddTag] = React.useState(false);
  const [newTagValue, setNewTagValue] = React.useState("");

  const handleOpenAddTag = () => {
    setOpenAddTag(true);
  };

  const handleCloseAddTag = () => {
    setOpenAddTag(false);
  };

  const handlesetNewTagValue = value => {
    setNewTagValue(value);
  };

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
      default:
        setProjectFieldEnValue(keyName, value);
    }
  }

  function handleAddNewTag() {
    setProjectTag(newTagValue);
    handleCloseAddTag();
  }

  function handleDeleteTag(value) {
    deleteProjectTag(value);
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
              keyName === "yearOfCreation" ||
              keyName === "imageId"
            ) {
              return null;
            }
            switch (keyName) {
              case "name":
              case "description":
              case "chairName":
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
              case "tags":
                return (
                  <div
                    key={i}
                    component="ul"
                    variant="outlined"
                    className={
                      projectDialogState === "view" ? classes.tagsDisabled : classes.tags
                    }
                  >
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className={classes.tagText}
                    >
                      {language === "en" ? en.tags : de.tags}:
                    </Typography>
                    {projectDialogState === "view"
                      ? projectTags.map((tag, i) => {
                          return (
                            <li key={i}>
                              <Chip label={tag} className={classes.chipDisabled} />
                            </li>
                          );
                        })
                      : projectTags.map((tag, i) => {
                          return (
                            <li key={i}>
                              <Chip
                                label={tag}
                                onDelete={() => {
                                  handleDeleteTag(tag);
                                }}
                                className={classes.chip}
                              />
                            </li>
                          );
                        })}
                    {projectDialogState === "view" ? null : (
                      <Button
                        onClick={handleOpenAddTag}
                        variant="contained"
                        size="small"
                        color="inherit"
                        className={classes.button}
                      >
                        {language === "en" ? en.addTag : de.addTag}
                      </Button>
                    )}
                    <Dialog
                      open={openAddTag}
                      onClose={handleCloseAddTag}
                      aria-labelledby="form-dialog-title"
                    >
                      <DialogTitle id="form-dialog-title">
                        {language === "en" ? en.addTag : de.addTag}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          {language === "en" ? en.addTagText : de.addTagText}
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="tag"
                          label={language === "en" ? en.tagName : de.tagName}
                          fullWidth
                          onChange={event => handlesetNewTagValue(event.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseAddTag} color="secondary">
                          {language === "en" ? en.cancel : de.cancel}
                        </Button>
                        <Button onClick={handleAddNewTag} color="secondary">
                          {language === "en" ? en.add : de.add}
                        </Button>
                      </DialogActions>
                    </Dialog>
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
  setProjectTag: setProjectTag,
  setProjectFieldEnValue: setProjectFieldEnValue,
  deleteProjectTag: deleteProjectTag,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(CreateViewEditProject));
