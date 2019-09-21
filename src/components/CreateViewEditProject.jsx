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
  Typography,
} from "@material-ui/core";
import {projectDialogClose} from "../actions/mainPage";

function CreateViewDeleteProject(props) {
  const {
    open,
    language,
    dialogClose,
    projectDialogState,
    projectFields,
    allProjects,
    selectedProject,
  } = props;

  function handleClose() {
    dialogClose();
  }

  function displayContent(field) {
    switch (field.name) {
      case "Project Name":
        return allProjects.filter(function(project) {
          return project.id === selectedProject;
        })[0].name;
      case "Project Description":
        return allProjects.filter(function(project) {
          return project.id === selectedProject;
        })[0].desc;
      default:
        return null;
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                return null;
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
          {projectDialogState === "view" ? (
            <ViewProjectFields
              displayContent={displayContent}
              projectFields={projectFields}
              projectDialogState={projectDialogState}
            />
          ) : (
            projectFields.map(({id, name, type}) => (
              <div key={id}>
                {(() => {
                  switch (type) {
                    case "text":
                      return (
                        <TextField
                          id="text"
                          autoFocus
                          margin="dense"
                          label={name}
                          defaultValue={
                            projectDialogState === "edit" ? displayContent({name}) : null
                          }
                          type="text"
                          fullWidth
                        />
                      );
                    case "multiline":
                      return (
                        <TextField
                          id="outlined-multiline-static"
                          label={name}
                          multiline
                          defaultValue={
                            projectDialogState === "edit" ? displayContent({name}) : null
                          }
                          rows="4"
                          margin="dense"
                          variant="outlined"
                          fullWidth
                        />
                      );
                    default:
                      return null;
                  }
                })()}
              </div>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            {language === "en" ? en.cancel : de.cancel}
          </Button>
          <Button onClick={handleClose} color="secondary">
            {language === "en" ? en.submit : de.submit}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function ViewProjectFields(props) {
  const {displayContent, projectFields, projectDialogState} = props;
  return (
    <div>
      {projectFields.map(({id, name, type}) => (
        <div key={id}>
          {(() => {
            switch (type) {
              case "text":
                return (
                  <Typography>
                    {projectDialogState === "view"
                      ? name + " : " + displayContent({name})
                      : null}
                  </Typography>
                );

              case "multiline":
                return (
                  <Typography>
                    {projectDialogState === "view"
                      ? name + " : " + displayContent({name})
                      : null}
                  </Typography>
                );
              default:
                return null;
            }
          })()}
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = ({
  mainPage: {projectDialogState, projectFields, allProjects, selectedProject},
}) => ({
  projectDialogState,
  projectFields,
  allProjects,
  selectedProject,
});

const mapDispatchToProps = {
  dialogClose: projectDialogClose,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateViewDeleteProject);
