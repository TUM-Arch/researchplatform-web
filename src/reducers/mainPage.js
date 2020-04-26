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
import {projectsURL} from "../util/constants";

let initialState = {
  language: "en",
  viewProjects: "my",
  allProjects: [],
  myProjects: [],
  userId: "tempuser",
  isAdmin: true, //TODO: Map this to user isAdmin property
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
  sortByYear: "",
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
        myProjects: action.values.projectsList
          .filter(function(project) {
            return project.userId === state.userId;
          })
          .sort(function(a, b) {
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
    return fetch(projectsURL, {
      method: "GET",
    })
      .then(response => response.json())
      .then(result => {
        values = {
          numberOfProjects: result.numberOfProjects,
          projectsList: result.projectsList,
        };
        dispatch(updateProjects(values));
      });
  };
}

export function deleteProject(id) {
  return dispatch => {
    return fetch(projectsURL + "/" + id, {
      method: "DELETE",
    });
  };
}
