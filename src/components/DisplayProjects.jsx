import React from 'react';
import Project from './Project';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

class DisplayProjects extends React.Component {

    function 
    
    render() {
        //TODO: Remove the below const and var
        const globalUser = "raypinto"
        const projects = this.props.projects;
        console.log(projects);
        const viewProjects = this.props.viewProjects;
        var renderedProjects=[];
        var dummyYear;
        let prevCreatedOn = projects[0].createdOn++;

        const styles = {
            TextStyle: {
                Component: 'div',
                textAlign: 'left',
                fontSize: 22,
                paddingLeft: 48,
                fontWeight: "bold"
            },
            divStyle: {
                paddingBottom: 10
            }
        }
        
        // projects.sort(function(a, b) {
        //     return a.createdOn < b.createdOn ? 1 : -1 
        // });
        
        // for(var i=0;i<projects.length;i++){
        //     if (viewProjects === "all") {
        //             if (projects[i].createdOn !== dummyYear) {
        //                 dummyYear= projects[i].createdOn;
        //                 renderedProjects.push(<Typography style={styles.TextStyle} color="secondary">{dummyYear}</Typography>);
        //             }
        //             renderedProjects.push(<Project id= {projects[i].id} name={ projects[i].name } desc= { projects[i].desc } dept={ projects[i].dept } createdBy= { projects[i].createdBy } createdOn = { projects[i].createdOn }  />);
        //     } else {
        //         if (globalUser === projects[i].createdBy){
        //             if (projects[i].createdOn !== dummyYear) {
        //                 dummyYear= projects[i].createdOn;
        //                 renderedProjects.push(<Typography key={dummyYear} style={styles.TextStyle} color="secondary">{dummyYear}</Typography>);
        //             }
        //             renderedProjects.push(<Project key={i} id= {projects[i].id} name={ projects[i].name } desc= { projects[i].desc } dept={ projects[i].dept } createdBy= { projects[i].createdBy } createdOn = { projects[i].createdOn } />);
        //         }
        //     }
        // }
        
        return (
            <div style={styles.divStyle}> 
                { projects.map(({index, id, name,dept, desc, createdBy, createdOn}) => (
                    <div>
                        <Typography style={styles.TextStyle} color="secondary">{createdOn[index] < createdOn[index - 1]? createdOn : null}</Typography>
                        <Project id= {id} name={name } desc= { desc } dept={ dept } createdBy= { createdBy } createdOn = { createdOn } />
                        {/* {prevCreatedOn = createdOn} */}
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = ({
    mainPage: {
        viewProjects
    }}  
) => ({
    viewProjects
});

export default connect(mapStateToProps) (DisplayProjects);

