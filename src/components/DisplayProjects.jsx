import React from 'react';
import Project from './Project';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

class DisplayProjects extends React.Component {
    
    render() {
        //TODO: Remove the below const and var
        const globalUser = "raypinto"
        var dummyProjects=[
            {"id": 1, "name":"2nd SKIN Scaler", "desc": "The EU needs a zero-energy (ZE) refurbishment rate of around 3% to achieve its 2050 targets for a low carbon urban environment. The current refurbishment rate is far too low, despite all the policy measures over the past years. Although technically feasible, ZE-renovation projects developed in recent years are still too expensive, often suffer from disappointed inhabitants and unexpected higher energy-use.", "dept": ["Chair for building technology", "climate-friendly construction"], "createdBy": "pinto", "createdOn": "1994" }, 
            {"id": 2, "name":"Building the buildings", "desc": "Although technically feasible, ZE-renovation projects developed in recent years are still too expensive, often suffer from disappointed inhabitants and unexpected higher energy-use.", "dept": ["Chair for building technology"], "createdBy": "raypinto", "createdOn": "2017" }, 
            {"id": 3, "name":"Architects on Architects", "desc": "The new construction of the upper level building of the Waldorf School in Stuttgart was worked out in an integral planning process. Architects, building physicists, energy and HLSE planners worked together with planners of the other trades and in close cooperation with the client and the users to find a solution whose central goal was a sustainable building with a high quality of stay and a low demand for fossil energy Has. The findings from the parallel research project Development of exemplary new building measures for the Waldorf School Uhlandshöhe in Stuttgart on the basis of measurements and analyzes of newly built schools were consistently incorporated into the planning.", "dept": ["Chair of Urban Architecture", "Chair of Design and Design"], "prof": ["Prof. Dietrich Fink", "Prof. Prof. Uta Graff"], "createdBy": "raypinto", "createdOn": "2018" }
        ];
        const viewProjects = this.props.viewProjects;
        var projects=[];
        var dummyYear;

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
        
        dummyProjects.sort(function(a, b) {
            return a.createdOn < b.createdOn ? 1 : -1 
        });
        
        for(var i=0;i<dummyProjects.length;i++){
            if (viewProjects === "all") {
                    if (dummyProjects[i].createdOn !== dummyYear) {
                        dummyYear= dummyProjects[i].createdOn;
                        projects.push(<Typography style={styles.TextStyle} color="secondary">{dummyYear}</Typography>);
                    }
                    projects.push(<Project name={ dummyProjects[i].name } desc= { dummyProjects[i].desc } dept={ dummyProjects[i].dept } createdBy= { dummyProjects[i].createdBy } createdOn = { dummyProjects[i].createdOn }  />);
            } else {
                if (globalUser === dummyProjects[i].createdBy){
                    if (dummyProjects[i].createdOn !== dummyYear) {
                        dummyYear= dummyProjects[i].createdOn;
                        projects.push(<Typography key={dummyYear} style={styles.TextStyle} color="secondary">{dummyYear}</Typography>);
                    }
                    projects.push(<Project key={i} name={ dummyProjects[i].name } desc= { dummyProjects[i].desc } dept={ dummyProjects[i].dept } createdBy= { dummyProjects[i].createdBy } createdOn = { dummyProjects[i].createdOn } />);
                }
            }
        }
        
        return (
            <div style={styles.divStyle}> 
                { projects }
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

