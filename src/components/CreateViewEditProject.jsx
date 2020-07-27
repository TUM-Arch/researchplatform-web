import React from "react";
import {connect} from "react-redux";
import en from "../translations/en.json";
import de from "../translations/de.json";
import {
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Chip,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";

import DeleteIcon from "@material-ui/icons/Delete";
import {withStyles} from "@material-ui/styles";
import {
  projectDialogClose,
  setProjectName,
  setProjectChairName,
  setProjectDescription,
  deleteProjectImage,
  setProjectTag,
  deleteProjectTag,
  setProjectFieldEnValue,
  setProjectFieldDeValue,
  setprojectLanguageChoice,
} from "../actions/mainPage";
import {
  createNewProject,
  handleEditProject,
  handleSubmitProject,
  createOrUpdateTags,
  handleSetProjectImage,
} from "../reducers/mainPage";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  media: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textFields: {
    margin: theme.spacing(2),
  },
  rowAboveFields: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
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
  cardImage: {
    objectFit: "scale-down",
  },
  input: {
    paddingTop: theme.spacing(0.5),
    paddingLeft: theme.spacing(0.5),
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
    jwt,
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
    deleteProjectImage,
    setProjectTag,
    deleteProjectTag,
    setProjectFieldEnValue,
    setProjectFieldDeValue,
    setprojectLanguageChoice,
    projectTags,
    projectFields,
    projectLanguageChoice,
    selectedProjectImageString,
    allAvailableProjectTags,
    handleSetProjectImage,
  } = props;

  const [openAddTag, setOpenAddTag] = React.useState(false);
  const [newTagValue, setNewTagValue] = React.useState("");
  const inputFile = React.createRef(null);
  const [imageRef, setImageRef] = React.useState(null);

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
        projectField =>
          projectField.required === true &&
          projectField.valueEn === "" &&
          projectLanguageChoice !== "de"
      ) ||
      projectFields.some(
        projectField =>
          projectField.required === true &&
          projectField.valueDe === "" &&
          projectLanguageChoice !== "en"
      )
    );
  }

  async function handleSave() {
    if (isRequiredFieldsNotFilled()) {
      alert("The required fields are empty!!");
    } else {
      if (projectDialogState === "create") {
        await createOrUpdateTags(projectTags, jwt).then(async resultTags => {
          await createNewProject(
            projectName,
            projectChairName,
            projectDescription,
            projectImageId,
            resultTags,
            projectFields,
            userId,
            jwt
          ).then(async project => {
            if (imageRef) {
              const formData = new FormData();
              formData.append("image", imageRef, imageRef.name);
              formData.append("projectId", project.id);
              await handleSetProjectImage(formData, jwt).then(() => {
                setImageRef(null);
                window.location.reload();
              });
            }
          });
        });
      } else {
        await createOrUpdateTags(projectTags, jwt).then(resultTags => {
          handleEditProject(
            projectName,
            projectChairName,
            projectDescription,
            projectImageId,
            projectTags,
            projectFields,
            userId,
            selectedProject.id,
            jwt
          );
        });
      }
    }
  }

  function handleSubmit() {
    handlesubmitProject(selectedProject.id, jwt);
    dialogClose();
  }

  function handleImageUpload(e) {
    setImageRef(e.target.files[0]);
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
    }
  }

  function handleOnChangeProjectFieldEvent(id, value, language) {
    language === "en"
      ? setProjectFieldEnValue(id, value)
      : setProjectFieldDeValue(id, value);
  }

  function handleAddNewTag() {
    setProjectTag(newTagValue);
    handleCloseAddTag();
  }

  function handleDeleteTag(value) {
    deleteProjectTag(value);
  }

  function handleDeleteImage() {
    deleteProjectImage();
  }

  function handleLanguageChoice(event) {
    setprojectLanguageChoice(event.target.value);
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
          <div className={classes.rowAboveFields}>
            <DialogContentText>
              {projectDialogState === "create"
                ? language === "en"
                  ? en.newProjectSubtitle
                  : de.newProjectSubtitle
                : language === "en"
                ? en.oldProjectSubtitle
                : de.oldProjectSubtitle}
            </DialogContentText>
            <FormControl style={{minWidth: 120}}>
              <InputLabel>
                {language === "en" ? en.inputLanguage : de.inputLanguage}
              </InputLabel>
              <Select value={projectLanguageChoice} onChange={handleLanguageChoice}>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="de">German</MenuItem>
                <MenuItem value="both">Both</MenuItem>
              </Select>
            </FormControl>
          </div>
          {projectImageId === "" ? null : (
            <div className={classes.media}>
              {projectDialogState === "edit" || projectDialogState === "view" ? (
                <CardMedia
                  component="img"
                  height="125"
                  image={`data:image/png;base64, ${selectedProjectImageString}`}
                  className={classes.cardImage}
                />
              ) : null}
              {projectDialogState === "view" ? null : (
                <Tooltip placement="top" title="Delete">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteImage()}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          )}
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
                return (
                  <div key={i} className={classes.textFields}>
                    <CustomTextField
                      multiline
                      rows={keyName === "description" ? "4" : "1"}
                      label={
                        keyName === "name"
                          ? language === "en"
                            ? en.fieldProjectName
                            : de.fieldProjectName
                          : keyName === "description"
                          ? language === "en"
                            ? en.fieldDescription
                            : de.fieldDescription
                          : language === "en"
                          ? en.fieldChairName
                          : de.fieldChairName
                      }
                      defaultValue={
                        projectDialogState === "create" ? "" : selectedProject[keyName]
                      }
                      disabled={projectDialogState === "view" ? true : false}
                      required={true}
                      variant="outlined"
                      fullWidth
                      onChange={event => {
                        handleOnChangeEvent(keyName, event.target.value);
                      }}
                    />
                  </div>
                );
              case "imageId":
                return (
                  projectDialogState === "create" && (
                    <div
                      key={i}
                      component="ul"
                      variant="outlined"
                      className={classes.tags}
                    >
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className={classes.tagText}
                      >
                        {language === "en" ? en.selectImage : de.selectImage}:
                      </Typography>

                      <input
                        className={classes.input}
                        ref={inputFile}
                        type="file"
                        onChange={e => handleImageUpload(e)}
                      />
                    </div>
                  )
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
                        <Autocomplete
                          id="search-input-tag"
                          freeSolo
                          fullWidth
                          options={
                            allAvailableProjectTags
                              ? allAvailableProjectTags.map(tag => tag.name)
                              : null
                          }
                          onInputChange={(event, newTagValue) =>
                            handlesetNewTagValue(newTagValue)
                          }
                          renderInput={params => (
                            <CustomTextField
                              {...params}
                              label={language === "en" ? en.tagName : de.tagName}
                              margin="dense"
                              variant="filled"
                              color="secondary"
                            />
                          )}
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
                          {projectLanguageChoice !== "de" ? (
                            <CustomTextField
                              label={projectFields[j].nameEn}
                              defaultValue={projectFields[j].valueEn}
                              required={projectFields[j].required}
                              disabled={projectDialogState === "view" ? true : false}
                              inputProps={{maxLength: projectFields[j].length}}
                              variant="outlined"
                              fullWidth
                              onChange={event => {
                                handleOnChangeProjectFieldEvent(
                                  projectFields[j].id,
                                  event.target.value,
                                  "en"
                                );
                              }}
                            />
                          ) : null}
                          {projectLanguageChoice !== "en" ? (
                            <CustomTextField
                              label={
                                projectLanguageChoice === "de"
                                  ? projectFields[j].nameDe
                                  : ""
                              }
                              placeholder={
                                projectLanguageChoice === "both"
                                  ? projectFields[j].nameDe
                                  : ""
                              }
                              defaultValue={projectFields[j].valueDe}
                              required={projectFields[j].required}
                              disabled={projectDialogState === "view" ? true : false}
                              inputProps={{maxLength: projectFields[j].length}}
                              variant="outlined"
                              fullWidth
                              onChange={event => {
                                handleOnChangeProjectFieldEvent(
                                  projectFields[j].id,
                                  event.target.value,
                                  "de"
                                );
                              }}
                            />
                          ) : null}
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
  loginPage: {jwt},
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
    projectLanguageChoice,
    selectedProjectImageString,
    allAvailableProjectTags,
  },
}) => ({
  jwt,
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
  projectLanguageChoice,
  selectedProjectImageString,
  allAvailableProjectTags,
});

const mapDispatchToProps = {
  dialogClose: projectDialogClose,
  createNewProject: createNewProject,
  handleEditProject: handleEditProject,
  handlesubmitProject: handleSubmitProject,
  setProjectName: setProjectName,
  setProjectChairName: setProjectChairName,
  setProjectDescription: setProjectDescription,
  deleteProjectImage: deleteProjectImage,
  setProjectTag: setProjectTag,
  deleteProjectTag: deleteProjectTag,
  setProjectFieldEnValue: setProjectFieldEnValue,
  setProjectFieldDeValue: setProjectFieldDeValue,
  setprojectLanguageChoice: setprojectLanguageChoice,
  handleSetProjectImage: handleSetProjectImage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(CreateViewEditProject));
