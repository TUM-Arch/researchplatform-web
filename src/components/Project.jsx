import React from "react";
import {connect} from "react-redux";
import {
  IconButton,
  Tooltip,
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import {red} from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import GetAppIcon from "@material-ui/icons/GetApp";
import SearchIcon from "@material-ui/icons/Search";
import {withStyles} from "@material-ui/styles";
import {editProject, viewProject, setSelectedProject} from "../actions/mainPage";
import jsPDF from "jspdf";

const styles = theme => ({
  root: {
    width: 300,
    maxWidth: 325,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  projectDescText: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

function Project(props) {
  const {classes, project, viewProject, editProject, setSelectedProject} = props;

  // Get current user
  const currentUserId = sessionStorage.getItem("userId");

  function handleViewProject(id) {
    viewProject();
    setSelectedProject(id);
  }

  function handleEditProject(id) {
    editProject();
    setSelectedProject(id);
  }

  function handleDownloadProject() {
    var doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(20, 20, project.name);
    doc.setFontSize(13);
    var desc = doc.splitTextToSize(project.description, 170);
    doc.text(20, 30, desc);
    doc.save(project.name + ".pdf");
  }

  function convertTimeStampToDate(timestamp) {
    var dateFormat = new Date(timestamp);
    var year = dateFormat.getFullYear();
    var month = dateFormat.getMonth() + 1;
    var date = dateFormat.getDate();
    if (date < 10) {
      date = "0" + date;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return date + "-" + month + "-" + year;
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={project.name}
        subheader={convertTimeStampToDate(project.createdAt)}
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.projectDescText}
        >
          {project.description}
        </Typography>
      </CardContent>
      <CardActions>
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
        <Tooltip placement="top" title="Download">
          <IconButton
            edge="end"
            aria-label="download"
            onClick={() => handleDownloadProject()}
            className={classes.icon}
          >
            <GetAppIcon />
          </IconButton>
        </Tooltip>
        {project.userId === currentUserId ? (
          <Tooltip placement="top" title="Delete">
            <IconButton edge="end" aria-label="delete" className={classes.icon}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </CardActions>
    </Card>
  );
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
)(withStyles(styles, {withTheme: true})(Project));
