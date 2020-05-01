import React from "react";
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
import Project from "./Project";
import {withStyles} from "@material-ui/styles";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  subRoot: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  projects: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  paper: {
    padding: theme.spacing(2),
    justifyContent: "space-between",
    color: "theme.palette.text.secondary",
  },
  yearText: {
    padding: theme.spacing(2),
  },
  margin: {
    marginLeft: "16px",
  },
});

class DisplayProjects extends React.Component {
  render() {
    const {classes, projects} = this.props;

    const getAllProjectsSortedByYear = function(projects) {
      var prevCreatedOn = 0;
      if (!Array.isArray(projects) || !projects.length) {
        prevCreatedOn = 0;
        return [];
      } else {
        prevCreatedOn = projects[0].yearOfCreation + 1;
      }
      var projectsSortedByYear = [];
      projects.forEach(project => {
        if (project.yearOfCreation < prevCreatedOn) {
          // New Year. Push previous one to projectsSortedByYear and rebuild.
          var newYearObject = {
            year: project.yearOfCreation,
            values: [],
          };
          projectsSortedByYear.push(newYearObject);
        }
        var objectToPushTo = projectsSortedByYear.find(
          object => object.year === project.yearOfCreation
        );
        if (objectToPushTo) {
          objectToPushTo.values.push(project);
        }
        prevCreatedOn = project.yearOfCreation;
      });
      return projectsSortedByYear;
    };
    const allProjectsSortedByYear = getAllProjectsSortedByYear(projects);

    return (
      <div className={classes.root}>
        {allProjectsSortedByYear.map((yearBasedProjects, i) => (
          <div className={classes.subRoot} key={yearBasedProjects.year}>
            <Typography variant="h6" color="secondary" className={classes.yearText}>
              {yearBasedProjects.year}
            </Typography>
            <div className={classes.projects}>
              {yearBasedProjects.values.map((project, i) => (
                <div className={classes.paper} key={project.id}>
                  <Project project={project} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({mainPage: {viewProjects}}) => ({
  viewProjects,
});

export default connect(mapStateToProps)(
  withStyles(styles, {withTheme: true})(DisplayProjects)
);
