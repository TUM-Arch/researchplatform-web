import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import en from "../translations/en.json";
import de from "../translations/de.json";
import DisplayProjects from "./DisplayProjects";
import {viewAllProjects, viewMyProjects, createProject} from "../actions/mainPage";

import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CreateViewDeleteProject from "./CreateViewEditProject";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  paper: {
    color: theme.palette.text.secondary,
    minHeight: 600,
  },
  projectTitle: {
    textDecoration: "underline",
  },
  projectSubtitle: {
    marginLeft: theme.spacing(6),
  },
  timeTitle: {
    padding: theme.spacing(6, 1, 1, 7),
    textAlign: "left",
    textDecoration: "underline",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    paddingRight: theme.spacing(5),
  },
}));

function MainPage(props) {
  const classes = useStyles();
  const {
    language,
    viewProjects,
    viewAllProj,
    viewMyProj,
    allProjects,
    myProjects,
    isProjectDialogOpen,
    createProject,
  } = props;

  function handleView(event) {
    if (event.target.value === "all") viewAllProj();
    else viewMyProj();
  }

  function handleCreateProject() {
    createProject();
  }

  return (
    <div>
      <Header />
      <div className={classes.root}>
        <Box display="flex" flexDirection="row" p={0} m={2} bgcolor="background.paper">
          <Box p={0} m={2} flex={6}>
            <Paper className={classes.paper}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                p={5}
                bgcolor="background.paper"
              >
                <Typography
                  variant="h4"
                  color="secondary"
                  className={classes.projectTitle}
                >
                  {language === "en" ? en.leftPaneTitle : de.leftPaneTitle}
                </Typography>
                <Button
                  onClick={handleCreateProject}
                  variant="contained"
                  color="secondary"
                >
                  {language === "en" ? en.createProject : de.createProject}
                </Button>
                <CreateViewDeleteProject open={isProjectDialogOpen} language={language} />
              </Box>
              <Box display="flex" flexDirection="column">
                <Typography variant="body1" className={classes.projectSubtitle}>
                  {language === "en" ? en.projectSubtitle : de.projectSubtitle}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <FormControl className={classes.formControl}>
                  <InputLabel>View Projects</InputLabel>
                  <Select value={viewProjects} onChange={handleView}>
                    <MenuItem value="all">All Projects</MenuItem>
                    <MenuItem value="my">My Projects</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <DisplayProjects
                  projects={viewProjects === "all" ? allProjects : myProjects}
                />
              </Box>
            </Paper>
          </Box>
          <Box p={0} m={2} flexGrow={1}>
            <Paper className={classes.paper}>
              <Typography variant="h6" className={classes.timeTitle} color="secondary">
                {language === "en" ? en.time : de.time}
              </Typography>
            </Paper>
          </Box>
        </Box>
      </div>
    </div>
  );
}

const mapStateToProps = ({
  mainPage: {language, viewProjects, allProjects, myProjects, isProjectDialogOpen},
}) => ({
  language,
  viewProjects,
  allProjects,
  myProjects,
  isProjectDialogOpen,
});

const mapDispatchToProps = {
  viewAllProj: viewAllProjects,
  viewMyProj: viewMyProjects,
  createProject: createProject,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
