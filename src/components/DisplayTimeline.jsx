import React from "react";
import {connect} from "react-redux";
import {Link, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import scrollToComponent from "react-scroll-to-component";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
  },
  linkText: {
    margin: theme.spacing(2),
    textDecoration: "underline",
  },
});

class DisplayTimeline extends React.Component {
  render() {
    const {classes, projects, projectsRefs} = this.props;
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
              <Link
                component="button"
                color="secondary"
                onClick={() =>
                  scrollToComponent(projectsRefs[i].current, {
                    offset: 0,
                    align: "top",
                    duration: 750,
                  })
                }
                className={classes.linkText}
              >
                <Typography>{project.yearOfCreation}</Typography>
              </Link>
            ) : null}

            {setPrevCreatedOn(project.yearOfCreation)}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({mainPage: {sortByYear}}) => ({
  sortByYear,
});

export default connect(mapStateToProps)(
  withStyles(styles, {withTheme: true})(DisplayTimeline)
);
