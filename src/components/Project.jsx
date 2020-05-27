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
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";
import {red} from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ImageIcon from "@material-ui/icons/Image";
import {withStyles} from "@material-ui/styles";
import {
  editProject,
  viewProject,
  setSelectedProject,
  dummyDispatch,
  setSelectedProjectImageString,
} from "../actions/mainPage";
import {
  handledeleteProject,
  handleSubmitProject,
  handleRejectProject,
  getImageFromId,
  handleSetProjectImage,
} from "../reducers/mainPage";
import {
  COLOR_NOT_SUBMITTED,
  COLOR_SUBMITTED,
  COLOR_REJECTED,
  COLOR_APPROVED,
  defaultImageIcon,
} from "../util/constants";
import {PDFDownloadLink} from "@react-pdf/renderer";
import PDFDoc from "./PDFDoc";
import en from "../translations/en.json";
import de from "../translations/de.json";
import PopupState, {bindTrigger, bindMenu} from "material-ui-popup-state";

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
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  adminTools: {
    marginRight: theme.spacing(1.5),
  },
  generalTools: {
    padding: theme.spacing(1.5),
  },
  leftPadding: {
    paddingLeft: theme.spacing(1.2),
  },
});

class Project extends React.Component {
  displayImage = defaultImageIcon;
  imageName = "";
  async componentWillMount() {
    if (this.props.project.imageId !== "" && this.props.project.imageId !== null) {
      await getImageFromId(this.props.project.imageId, this.props.jwt).then(value => {
        this.displayImage = value.image;
        this.imageName = value.imageName;
        this.props.dummyDispatch();
      });
    }
  }

  async handleImageChange(event, id) {
    if (event.target.files && event.target.files[0]) {
      const fileName = event.target.files[0].name;
      const formData = new FormData();
      formData.append("image", event.target.files[0], fileName);
      formData.append("projectId", id);
      await this.props.handleSetProjectImage(formData, this.props.jwt).then(value => {
        this.displayImage = value.image;
        this.imageName = value.imageName;
        this.props.dummyDispatch();
      });
    }
  }

  render() {
    const {
      classes,
      project,
      language,
      isAdmin,
      jwt,
      userId,
      viewProject,
      editProject,
      handledeleteProject,
      handlesubmitProject,
      handlerejectProject,
      setSelectedProject,
      setSelectedProjectImageString,
    } = this.props;
    const inputFile = React.createRef(null);

    function handleViewProject(id, imageString) {
      setSelectedProjectImageString(imageString);
      viewProject(id);
      setSelectedProject(id);
    }

    function handleEditProject(id, imageString) {
      setSelectedProjectImageString(imageString);
      editProject(id);
      setSelectedProject(id);
    }

    function handleDeleteProject(id) {
      handledeleteProject(id, jwt);
    }

    function handleSubmitApproveProject(id) {
      handlesubmitProject(id, jwt);
    }

    function handleRejectProject(id) {
      handlerejectProject(id, jwt);
    }

    function onImageUpload() {
      inputFile.current.click();
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

    return (
      <Card className={classes.root} style={{background: setBackgroundColor()}}>
        <CardHeader
          avatar={
            <Tooltip placement="top" title={project.status}>
              <Avatar aria-label="status" className={classes.avatar}>
                {project.status === "NOTSUBMITTED"
                  ? "N"
                  : project.status === "SUBMITTED"
                  ? "S"
                  : project.status === "REJECTED"
                  ? "R"
                  : "A"}
              </Avatar>
            </Tooltip>
          }
          action={
            <div>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {popupState => (
                  <React.Fragment>
                    <IconButton aria-label="settings" {...bindTrigger(popupState)}>
                      <MoreVertIcon></MoreVertIcon>
                    </IconButton>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem
                        onClick={() => {
                          handleViewProject(project.id, this.displayImage);
                          popupState.close();
                        }}
                      >
                        <SearchIcon />
                        <Typography
                          variant="inherit"
                          noWrap
                          className={classes.leftPadding}
                        >
                          {language === "en" ? en.viewProject : de.viewProject}
                        </Typography>
                      </MenuItem>

                      <MenuItem
                        onClick={() => {
                          handleEditProject(project.id, this.displayImage);
                          popupState.close();
                        }}
                      >
                        <EditIcon />
                        <Typography
                          variant="inherit"
                          noWrap
                          className={classes.leftPadding}
                        >
                          {language === "en" ? en.editProject : de.editProject}
                        </Typography>
                      </MenuItem>

                      <MenuItem
                        onClick={() => {
                          onImageUpload();
                          popupState.close();
                        }}
                      >
                        <ImageIcon />
                        <Typography
                          variant="inherit"
                          noWrap
                          className={classes.leftPadding}
                        >
                          {language === "en" ? en.updateImage : de.updateImage}
                        </Typography>
                      </MenuItem>

                      {project.userId === userId || isAdmin ? (
                        <MenuItem
                          onClick={() => {
                            handleDeleteProject(project.id);
                            popupState.close();
                          }}
                        >
                          <DeleteIcon />
                          <Typography
                            variant="inherit"
                            noWrap
                            className={classes.leftPadding}
                          >
                            {language === "en" ? en.deleteProject : de.deleteProject}
                          </Typography>
                        </MenuItem>
                      ) : null}
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </div>
          }
          title={project.name}
          subheader={convertTimeStampToDate(project.createdAt)}
        />
        <input
          className={classes.input}
          ref={inputFile}
          type="file"
          onChange={e => this.handleImageChange(e, project.id)}
        />
        <label htmlFor={"img-button-file" + project.id}>
          <CardMedia
            component="img"
            height="125"
            image={`data:image/png;base64, ${this.displayImage}`}
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
        <CardActions className={classes.cardActions}>
          <div className={classes.generalTools}>
            <PDFDownloadLink
              style={{textDecoration: "none"}}
              document={
                <PDFDoc
                  project={project}
                  image={this.displayImage}
                  imageName={this.imageName}
                  language={language}
                />
              }
              fileName={project.name + ".pdf"}
            >
              {({loading}) =>
                loading ? (
                  "Loading document..."
                ) : (
                  <Button
                    size="small"
                    color="secondary"
                    className={classes.icon}
                    onClick={() => handleSubmitApproveProject(project.id)}
                  >
                    {language === "en" ? en.download : de.download}
                  </Button>
                )
              }
            </PDFDownloadLink>

            {project.userId === userId && project.status === "NOTSUBMITTED" ? (
              <Button
                size="small"
                color="secondary"
                onClick={() => handleSubmitApproveProject(project.id)}
              >
                {language === "en" ? en.submit : de.submit}
              </Button>
            ) : null}
          </div>
          <div className={classes.adminTools}>
            {project.status === "SUBMITTED" && isAdmin ? (
              <Tooltip placement="top" title="Approve">
                <IconButton
                  edge="end"
                  aria-label="approve"
                  onClick={() => handleSubmitApproveProject(project.id)}
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
                >
                  <ThumbDownIcon />
                </IconButton>
              </Tooltip>
            ) : null}
          </div>
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = ({
  loginPage: {isAdmin, jwt, userId},
  mainPage: {viewProjects, dummy, language},
}) => ({
  isAdmin,
  jwt,
  userId,
  viewProjects,
  dummy,
  language,
});

const mapDispatchToProps = {
  editProject: editProject,
  viewProject: viewProject,
  handledeleteProject: handledeleteProject,
  handlesubmitProject: handleSubmitProject,
  handlerejectProject: handleRejectProject,
  setSelectedProject: setSelectedProject,
  dummyDispatch: dummyDispatch,
  handleSetProjectImage: handleSetProjectImage,
  setSelectedProjectImageString: setSelectedProjectImageString,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(Project));
