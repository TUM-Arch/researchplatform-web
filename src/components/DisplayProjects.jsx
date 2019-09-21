import React from "react";
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
import Project from "./Project";
import {withStyles} from "@material-ui/styles";

const styles = theme => ({
  TextStyle: {
    Component: "div",
    textAlign: "left",
    fontSize: 22,
    paddingLeft: 48,
    fontWeight: "bold",
  },
  divStyle: {
    paddingBottom: 10,
  },
});

class DisplayProjects extends React.Component {
  render() {
    const {classes} = this.props;
    const projects = this.props.projects;
    var prevCreatedOn = projects[0].createdOn + 1;

    function setPrevCreatedOn(createdOn) {
      prevCreatedOn = createdOn;
    }

    return (
      <div className={classes.divStyle}>
        {projects.map(({id, name, dept, desc, createdBy, createdOn}) => (
          <div key={id}>
            <Typography className={classes.TextStyle} color="secondary">
              {createdOn < prevCreatedOn ? createdOn : null}
            </Typography>
            <Project
              id={id}
              name={name}
              desc={desc}
              dept={dept}
              createdBy={createdBy}
              createdOn={createdOn}
            />
            {setPrevCreatedOn(createdOn)}
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
