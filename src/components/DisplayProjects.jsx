import React from "react";
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
import Project from "./Project";
import {withStyles} from "@material-ui/styles";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(2),
  },
});

class DisplayProjects extends React.Component {
  render() {
    const {classes, projects, projectsRefs} = this.props;
    projects.map(() => projectsRefs.push(React.createRef()));
    var prevCreatedOn = 0;
    if (!Array.isArray(projects) || !projects.length) {
      prevCreatedOn = 0;
    } else {
      prevCreatedOn = projects[0].yearOfCreation + 1;
    }

    function setPrevCreatedOn(yearOfCreation) {
      prevCreatedOn = yearOfCreation;
    }

    return (
      <div className={classes.root}>
        {projects.map((project, i) => (
          <div key={project.id}>
            {project.yearOfCreation < prevCreatedOn ? (
              <div ref={projectsRefs[i]}>
                <Typography variant="h6" color="secondary">
                  {project.yearOfCreation}
                </Typography>
              </div>
            ) : null}
            <Project project={project} />
            {setPrevCreatedOn(project.yearOfCreation)}
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
