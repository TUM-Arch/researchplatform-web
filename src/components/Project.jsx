import React from "react";
import {connect} from "react-redux";
import {Chip, Divider, IconButton, Paper, Tooltip, Typography} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import {withStyles} from "@material-ui/styles";
import {editProject, viewProject, setSelectedProject} from "../actions/mainPage";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  projectItemsName: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  projectItemsText: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  projectActionItems: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  chips: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  chip: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },
  icon: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
});

function Project(props) {
  const {
    classes,
    project,
    viewProject,
    editProject,
    setSelectedProject,
    windowDims,
  } = props;

  // Get current user
  const currentUserId = sessionStorage.getItem("userId");
  // Window width supplied as style for project description to wrap properly on window resize
  const projectDescStyle = {
    width: windowDims.width * 0.75,
  };

  function handleViewProject(id) {
    viewProject();
    setSelectedProject(id);
  }

  function handleEditProject(id) {
    editProject();
    setSelectedProject(id);
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h6" className={classes.projectItemsName}>
        {project.name}
      </Typography>
      <Typography
        variant="body2"
        className={classes.projectItemsText}
        style={projectDescStyle}
      >
        {project.description}
      </Typography>
      <Divider variant="middle" className={classes.divider} />
      <div className={classes.projectActionItems}>
        <div className={classes.chips}>
          <Chip
            variant="outlined"
            color="secondary"
            size="small"
            label={project.chairName}
            className={classes.chip}
          />
        </div>
        <div className={classes.actions}>
          <Tooltip placement="top" title="View">
            <IconButton
              edge="end"
              aria-label="search"
              onClick={() => handleViewProject(project.id)}
              className={classes.icon}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title="Edit">
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => handleEditProject(project.id)}
              className={classes.icon}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          {project.userId === currentUserId ? (
            <Tooltip placement="top" title="Delete">
              <IconButton edge="end" aria-label="delete" className={classes.icon}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : null}
        </div>
      </div>
    </Paper>
  );
}

const mapStateToProps = ({mainPage: {viewProjects, windowDims}}) => ({
  viewProjects,
  windowDims,
});

const mapDispatchToProps = {
  editProject: editProject,
  viewProject: viewProject,
  setSelectedProject: setSelectedProject,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(Project));
