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
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import SendIcon from "@material-ui/icons/Send";
import {withStyles} from "@material-ui/styles";
import {editProject, viewProject, setSelectedProject} from "../actions/mainPage";
import {
  handledeleteProject,
  handleSubmitProject,
  handleRejectProject,
  getImageFromId,
  handleSetProjectImage,
} from "../reducers/mainPage";
import jsPDF from "jspdf";
import AuthAdmin from "./AuthAdmin";
import {
  COLOR_NOT_SUBMITTED,
  COLOR_SUBMITTED,
  COLOR_REJECTED,
  COLOR_APPROVED,
  defaultImageIcon,
} from "../util/constants";

const styles = theme => ({
  root: {
    width: 300,
    maxWidth: 325,
  },
  cardImage: {
    objectFit: "scale-down",
  },
  input: {
    display: "none",
  },
  avatar: {
    backgroundColor: red[500],
  },
  projectDescText: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

class Project extends React.Component {
  componentDidMount = () => {
    if (this.props.project.imageId !== "")
      this.props.getImageFromId(this.props.project.imageId, this.props.project.id);
  };

  render() {
    const {
      classes,
      project,
      projectImage,
      viewProject,
      editProject,
      handledeleteProject,
      handlesubmitProject,
      handlerejectProject,
      setSelectedProject,
      handleSetProjectImage,
    } = this.props;

    // Get current user
    const currentUserId = "tempuser";
    const isAdmin = AuthAdmin();

    function handleViewProject(id) {
      viewProject(id);
      setSelectedProject(id);
    }

    function handleEditProject(id) {
      editProject(id);
      setSelectedProject(id);
    }

    function handleDeleteProject(id) {
      handledeleteProject(id);
    }

    function handleSubmitApproveProject(id) {
      handlesubmitProject(id);
    }

    function handleRejectProject(id) {
      handlerejectProject(id);
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

    function setBackgroundColor() {
      if (project.status === "NOTSUBMITTED") return COLOR_NOT_SUBMITTED;
      else if (project.status === "SUBMITTED") return COLOR_SUBMITTED;
      else if (project.status === "REJECTED") return COLOR_REJECTED;
      else return COLOR_APPROVED;
    }

    function handleImageChange(event) {
      const formData = new FormData();
      formData.append("image", event.target.files[0], event.target.files[0].name);
      formData.append("projectId", project.id);
      handleSetProjectImage(formData);
    }

    return (
      <Card className={classes.root} style={{background: setBackgroundColor()}}>
        <CardHeader
          avatar={
            <Avatar aria-label="status" className={classes.avatar}>
              {project.status === "NOTSUBMITTED"
                ? "N"
                : project.status === "SUBMITTED"
                ? "S"
                : project.status === "REJECTED"
                ? "R"
                : "A"}
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
        <input
          className={classes.input}
          id="img-button-file"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="img-button-file">
          <CardMedia
            component="img"
            height="125"
            image={`data:image/png;base64, ${projectImage}`}
            title={project.name}
            className={classes.cardImage}
          />
        </label>

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
          {project.userId === currentUserId || isAdmin ? (
            <Tooltip placement="top" title="Delete">
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteProject(project.id)}
                className={classes.icon}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : null}
          {project.userId === currentUserId && project.status === "NOTSUBMITTED" ? (
            <Tooltip placement="top" title="Submit">
              <IconButton
                edge="end"
                aria-label="submit"
                onClick={() => handleSubmitApproveProject(project.id)}
                className={classes.icon}
              >
                <SendIcon />
              </IconButton>
            </Tooltip>
          ) : null}
          {project.status === "SUBMITTED" && isAdmin ? (
            <Tooltip placement="top" title="Approve">
              <IconButton
                edge="end"
                aria-label="approve"
                onClick={() => handleSubmitApproveProject(project.id)}
                className={classes.icon}
              >
                <ThumbUpIcon />
              </IconButton>
            </Tooltip>
          ) : null}
          {project.status === "SUBMITTED" && isAdmin ? (
            <Tooltip placement="top" title="Reject">
              <IconButton
                edge="end"
                aria-label="reject"
                onClick={() => handleRejectProject(project.id)}
                className={classes.icon}
              >
                <ThumbDownIcon />
              </IconButton>
            </Tooltip>
          ) : null}
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = ({mainPage: {viewProjects, projectImageId, projectImage}}) => ({
  viewProjects,
  projectImage,
});

const mapDispatchToProps = {
  editProject: editProject,
  viewProject: viewProject,
  handledeleteProject: handledeleteProject,
  handlesubmitProject: handleSubmitProject,
  handlerejectProject: handleRejectProject,
  setSelectedProject: setSelectedProject,
  handleSetProjectImage: handleSetProjectImage,
  getImageFromId: getImageFromId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(Project));
