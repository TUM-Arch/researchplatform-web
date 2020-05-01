import React from "react";
import {connect} from "react-redux";
import en from "../translations/en.json";
import de from "../translations/de.json";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {isMobile} from "react-device-detect";
import Header from "./Header";
import CreateViewDeleteProject from "./CreateViewEditProject";
import DisplayProjects from "./DisplayProjects";
import {
  viewAllProjects,
  viewMyProjects,
  viewSubmittedProjects,
  viewApprovedProjects,
  viewRejectedProjects,
  createProject,
  setWindowDimensions,
} from "../actions/mainPage";
import {getAllProjects} from "../reducers/mainPage";
import AuthAdmin from "./AuthAdmin";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  projectsLayout: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(2),
    width: "90%",
  },
  projectsLayoutText: {
    margin: theme.spacing(2),
  },
  rowAboveProjects: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  specificButtonInputs: {
    margin: theme.spacing(2),
  },
});

const isAdmin = AuthAdmin();

class UserPage extends React.Component {
  componentWillMount = () => {
    this.props.getAllProjects();
    this.updateDimensions();
  };
  componentDidMount = () => {
    window.addEventListener("resize", this.updateDimensions);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions);
  };
  updateDimensions = () => {
    const {setWindowDimensions} = this.props;
    const values = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    setWindowDimensions(values);
  };

  render() {
    const {
      classes,
      language,
      viewProjects,
      viewAllProj,
      viewMyProj,
      viewSubmittedProj,
      viewApprovedProj,
      viewRejectedProj,
      allProjects,
      myProjects,
      submittedRejectedApprovedProjects,
      isProjectDialogOpen,
      createProject,
      history,
    } = this.props;

    function handleView(event) {
      if (event.target.value === "all") viewAllProj();
      else if (event.target.value === "my") viewMyProj();
      else if (event.target.value === "submitted") viewSubmittedProj();
      else if (event.target.value === "approved") viewApprovedProj();
      else viewRejectedProj();
    }

    function handleCreateProject() {
      createProject();
    }

    return (
      <div>
        <Header history={history} searchEnabled={true} settingsEnabled={true} />
        <div className={isMobile === true ? classes.rootMobile : classes.root}>
          <div className={classes.projectsLayout}>
            <Typography
              variant="h5"
              color="secondary"
              className={classes.projectsLayoutText}
            >
              {language === "en" ? en.leftPaneTitle : de.leftPaneTitle}
            </Typography>
            <Typography variant="body1" className={classes.projectsLayoutText}>
              {language === "en" ? en.projectSubtitle : de.projectSubtitle}
            </Typography>
            <div className={classes.rowAboveProjects}>
              <Button
                onClick={handleCreateProject}
                variant="contained"
                size="small"
                color="secondary"
                className={classes.specificButtonInputs}
              >
                {language === "en" ? en.createProject : de.createProject}
              </Button>
              <FormControl className={classes.specificButtonInputs}>
                <InputLabel>{language === "en" ? en.view : de.view}</InputLabel>
                <Select value={viewProjects} onChange={handleView}>
                  <MenuItem value="all">
                    {language === "en" ? en.allProjects : de.allProjects}
                  </MenuItem>
                  <MenuItem value="my">
                    {language === "en" ? en.myProjects : de.myProjects}
                  </MenuItem>
                  {isAdmin ? (
                    <MenuItem value="submitted">
                      {language === "en" ? en.submittedProjects : de.submittedProjects}
                    </MenuItem>
                  ) : null}
                  {isAdmin ? (
                    <MenuItem value="approved">
                      {language === "en" ? en.approvedProjects : de.approvedProjects}
                    </MenuItem>
                  ) : null}
                  {isAdmin ? (
                    <MenuItem value="rejected">
                      {language === "en" ? en.rejectedProjects : de.rejectedProjects}
                    </MenuItem>
                  ) : null}
                </Select>
              </FormControl>
            </div>
            <DisplayProjects
              projects={
                viewProjects === "all"
                  ? allProjects
                  : viewProjects === "my"
                  ? myProjects
                  : submittedRejectedApprovedProjects
              }
            />
          </div>
        </div>
        <CreateViewDeleteProject open={isProjectDialogOpen} language={language} />
      </div>
    );
  }
}

const mapStateToProps = ({
  mainPage: {
    language,
    viewProjects,
    allProjects,
    myProjects,
    submittedRejectedApprovedProjects,
    isProjectDialogOpen,
  },
}) => ({
  language,
  viewProjects,
  allProjects,
  myProjects,
  submittedRejectedApprovedProjects,
  isProjectDialogOpen,
});

const mapDispatchToProps = {
  viewAllProj: viewAllProjects,
  viewMyProj: viewMyProjects,
  viewSubmittedProj: viewSubmittedProjects,
  viewApprovedProj: viewApprovedProjects,
  viewRejectedProj: viewRejectedProjects,
  createProject: createProject,
  setWindowDimensions: setWindowDimensions,
  getAllProjects: getAllProjects,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(UserPage));
