import { ENGLISH, GERMAN, VIEWALL, VIEWMY } from '../actions/mainPage';

let initialState = { 
  language: "en",
  viewProjects: "all",
  allProjects: [
    {"id": 1, "name":"2nd SKIN Scaler", "desc": "The EU needs a zero-energy (ZE) refurbishment rate of around 3% to achieve its 2050 targets for a low carbon urban environment. The current refurbishment rate is far too low, despite all the policy measures over the past years. Although technically feasible, ZE-renovation projects developed in recent years are still too expensive, often suffer from disappointed inhabitants and unexpected higher energy-use.", "dept": ["Chair for building technology", "climate-friendly construction"], "createdBy": "pinto", "createdOn": "1994" }, 
    {"id": 2, "name":"Building the buildings", "desc": "Although technically feasible, ZE-renovation projects developed in recent years are still too expensive, often suffer from disappointed inhabitants and unexpected higher energy-use.", "dept": ["Chair for building technology"], "createdBy": "raypinto", "createdOn": "2019" }, 
    {"id": 3, "name":"Architects on Architects", "desc": "The new construction of the upper level building of the Waldorf School in Stuttgart was worked out in an integral planning process. Architects, building physicists, energy and HLSE planners worked together with planners of the other trades and in close cooperation with the client and the users to find a solution whose central goal was a sustainable building with a high quality of stay and a low demand for fossil energy Has. The findings from the parallel research project Development of exemplary new building measures for the Waldorf School Uhlandshöhe in Stuttgart on the basis of measurements and analyzes of newly built schools were consistently incorporated into the planning.", "dept": ["Chair of Urban Architecture", "Chair of Design and Design"], "prof": ["Prof. Dietrich Fink", "Prof. Prof. Uta Graff"], "createdBy": "raypinto", "createdOn": "2018" }
  ],
  myProjects: []
}

export default function mainPage(state = initialState, action) {
    switch (action.type) {
      case ENGLISH:
        return {  
          ...state,
          language: "en"
         };
      case GERMAN:
        return {
          ...state,
          language: "de"
         };
      case VIEWALL:
        return {
          ...state,
          viewProjects: "all",
          projects: state.allProjects.sort(function(a, b) {return a.createdOn > b.createdOn ? 1 : -1 })
        };
      case VIEWMY:
        return {
          ...state,
          viewProjects: "my",
          myProjects: state.allProjects.filter(function(project) {return project.createdBy === "raypinto"}).sort(function(a, b) {return a.createdOn < b.createdOn ? 1 : -1 })
        };
      default:
        return state
    }
  }

