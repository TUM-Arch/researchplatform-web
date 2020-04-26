import React from "react";
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
import Project from "./Project";
import {withStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    display: "flex",
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    justifyContent: "space-between",
    color: "theme.palette.text.secondary",
  },
  margin: {
    marginLeft: "16px",
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
        <Grid container spacing={3}>
          {projects.map((project, i) => (
            <div key={project.id}>
              {project.yearOfCreation < prevCreatedOn ? (
                <div ref={projectsRefs[i]}>
                  <Grid item xs={12}>
                    <Typography variant="h6" color="secondary">
                      {project.yearOfCreation}
                    </Typography>
                  </Grid>
                </div>
              ) : null}
              <div className={classes.paper}>
                <Project project={project} />
              </div>
              {setPrevCreatedOn(project.yearOfCreation)}
            </div>
          ))}
        </Grid>
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
