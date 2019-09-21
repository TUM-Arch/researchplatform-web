import React from "react";
import {connect} from "react-redux";
import {
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import {makeStyles} from "@material-ui/core/styles";
import {editProject, viewProject, setSelectedProject} from "../actions/mainPage";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "90%",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(6),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    margin: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(1),
  },
  desc: {
    display: "block",
    maxWidth: 700, //Todo: Needs to change
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));

function Project(props) {
  const classes = useStyles();
  const projName = props.name;
  const projDept = props.dept;
  const projDesc = props.desc;
  const viewProject = props.viewProject;
  const editProject = props.editProject;
  const setSelectedProject = props.setSelectedProject;
  const viewProjects = props.viewProjects;

  function handleViewProject() {
    viewProject();
    setSelectedProject(props.id);
  }

  function handleEditProject() {
    editProject();
    setSelectedProject(props.id);
  }

  return (
    <List className={classes.root}>
      <Paper>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={projName}
            secondary={
              <React.Fragment>
                <Typography component="div" variant="body2" className={classes.desc}>
                  {projDesc}
                </Typography>
                <DeptChips value={projDept} />
              </React.Fragment>
            }
          />
          <ListItemSecondaryAction>
            <Tooltip placement="top" title="View">
              <IconButton
                edge="end"
                aria-label="search"
                onClick={handleViewProject}
                className={classes.icon}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Tooltip placement="top" title="Edit">
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={handleEditProject}
                className={classes.icon}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            {viewProjects === "my" ? (
              <Tooltip placement="top" title="Delete">
                <IconButton edge="end" aria-label="delete" className={classes.icon}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : null}
          </ListItemSecondaryAction>
        </ListItem>
      </Paper>
    </List>
  );
}

function DeptChips(props) {
  var dept = [];
  const classes = useStyles();
  for (var i = 0; i < props.value.length; i++) {
    dept.push(
      <Chip
        key={i}
        variant="outlined"
        color="secondary"
        size="small"
        label={props.value[i]}
        className={classes.chip}
      />
    );
  }

  return <div>{dept}</div>;
}

const mapStateToProps = ({mainPage: {viewProjects}}) => ({
  viewProjects,
});

const mapDispatchToProps = {
  editProject: editProject,
  viewProject: viewProject,
  setSelectedProject: setSelectedProject,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
