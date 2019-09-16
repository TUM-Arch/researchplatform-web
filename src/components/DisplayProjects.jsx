import React from 'react';
import Project from './Project';
import { connect } from 'react-redux';

class DisplayProjects extends React.Component {
    render() {
        //TODO: Remove the below const and var
        const globalUser = "raypinto"
        var dummyProjects=[
            {"name":"2nd SKIN Scaler", "desc": "The EU needs a zero-energy (ZE) refurbishment rate of around 3% to achieve its 2050 targets for a low carbon urban environment. The current refurbishment rate is far too low, despite all the policy measures over the past years. Although technically feasible, ZE-renovation projects developed in recent years are still too expensive, often suffer from disappointed inhabitants and unexpected higher energy-use.", "dept": ["Chair for building technology", "climate-friendly construction"], "createdBy": "pinto", "createdOn": "2017", "isPrivate": false }, 
            {"name":"Architects on Architects", "desc": "The new construction of the upper level building of the Waldorf School in Stuttgart was worked out in an integral planning process. Architects, building physicists, energy and HLSE planners worked together with planners of the other trades and in close cooperation with the client and the users to find a solution whose central goal was a sustainable building with a high quality of stay and a low demand for fossil energy Has. The findings from the parallel research project Development of exemplary new building measures for the Waldorf School Uhlandshöhe in Stuttgart on the basis of measurements and analyzes of newly built schools were consistently incorporated into the planning.", "dept": ["Chair of Urban Architecture", "Chair of Design and Design"], "prof": ["Prof. Dietrich Fink", "Prof. Prof. Uta Graff"], "createdBy": "raypinto", "createdOn": "2018", "isPrivate": true}
        ];

        const viewProjects = this.props.viewProjects;
        var projects=[];
        for(var i=0;i<dummyProjects.length;i++){
            if (viewProjects === "all") {
                if ( !dummyProjects[i].isPrivate || ( dummyProjects[i].isPrivate && globalUser === dummyProjects[i].createdBy))
                    projects.push(<Project name={ dummyProjects[i].name } desc= { dummyProjects[i].desc } dept={ dummyProjects[i].dept } createdBy= { dummyProjects[i].createdBy } createdOn = { dummyProjects[i].createdOn } isPrivate= { dummyProjects[i].isPrivate } />);
            }
            else {
                if (globalUser === dummyProjects[i].createdBy && ( !dummyProjects[i].isPrivate || ( dummyProjects[i].isPrivate && globalUser === dummyProjects[i].createdBy)))
                    projects.push(<Project name={ dummyProjects[i].name } desc= { dummyProjects[i].desc } dept={ dummyProjects[i].dept } createdBy= { dummyProjects[i].createdBy } createdOn = { dummyProjects[i].createdOn } isPrivate= { dummyProjects[i].isPrivate } />);
            }
        }
        return (
            <div> 
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

