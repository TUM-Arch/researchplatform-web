import fetch from "isomorphic-fetch";
import {
  ENGLISH,
  GERMAN,
  VIEWALL,
  VIEWMY,
  PROJECTDIALOGCLOSE,
  CREATEPROJECT,
  VIEWPROJECT,
  EDITPROJECT,
  SETSELECTEDPROJECT,
  SETWINDOWDIMS,
  UPDATE_PROJECTS,
  updateProjects,
} from "../actions/mainPage";

let initialState = {
  language: "en",
  viewProjects: "all",
  allProjects: [],
  myProjects: [],
  userId: "tempuser",
  isProjectDialogOpen: false,
  projectDialogState: "",
  projectFields: [
    {id: 1, name: "Project Name", type: "text"},
    {id: 2, name: "Project Description", type: "multiline"},
  ],
  selectedProject: "",
  windowDims: {
    width: "",
    height: "",
  },
};

export default function mainPage(state = initialState, action) {
  switch (action.type) {
    case ENGLISH:
      return {
        ...state,
        language: "en",
      };
    case GERMAN:
      return {
        ...state,
        language: "de",
      };
    case VIEWALL:
      return {
        ...state,
        viewProjects: "all",
        projects: state.allProjects.sort(function(a, b) {
          return a.yearOfCreation < b.yearOfCreation ? 1 : -1;
        }),
      };
    case VIEWMY:
      return {
        ...state,
        viewProjects: "my",
        myProjects: state.allProjects
          .filter(function(project) {
            return project.userId === state.userId;
          })
          .sort(function(a, b) {
            return a.yearOfCreation < b.yearOfCreation ? 1 : -1;
          }),
      };
    case PROJECTDIALOGCLOSE:
      return {
        ...state,
        isProjectDialogOpen: false,
      };
    case CREATEPROJECT:
      return {
        ...state,
        projectDialogState: "create",
        isProjectDialogOpen: true,
      };
    case VIEWPROJECT:
      return {
        ...state,
        projectDialogState: "view",
        isProjectDialogOpen: true,
      };
    case EDITPROJECT:
      return {
        ...state,
        projectDialogState: "edit",
        isProjectDialogOpen: true,
      };
    case SETSELECTEDPROJECT:
      return {
        ...state,
        selectedProject: action.value,
      };
    case SETWINDOWDIMS:
      return {
        ...state,
        windowDims: {
          width: action.values.width,
          height: action.values.height,
        },
      };
    case UPDATE_PROJECTS:
      return {
        ...state,
        allProjects: action.values.projectsList.sort(function(a, b) {
          return a.yearOfCreation < b.yearOfCreation ? 1 : -1;
        }),
      };
    default:
      return state;
  }
}

export function getAllProjects() {
  let values = {};
  return dispatch => {
    return fetch("http://localhost:5000/api/projects", {
      method: "GET",
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        values = {
          numberOfProjects: result.numberOfProjects,
          projectsList: result.projectsList,
        };
        dispatch(updateProjects(values));
      });
  };
}
