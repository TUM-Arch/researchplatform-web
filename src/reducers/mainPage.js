import fetch from "isomorphic-fetch";
import {
  ENGLISH,
  GERMAN,
  VIEWALL,
  VIEWMY,
  VIEWSUBMITTED,
  VIEWAPPROVED,
  VIEWREJECTED,
  PROJECTDIALOGCLOSE,
  CREATEPROJECT,
  VIEWPROJECT,
  EDITPROJECT,
  DELETEPROJECT,
  SUBMITREJECTPROJECT,
  SETSELECTEDPROJECT,
  SETWINDOWDIMS,
  UPDATE_PROJECTS,
  createProject,
  updateProjects,
  deleteProject,
  submitProject,
  rejectProject,
} from "../actions/mainPage";
import {projectsURL, imagesURL} from "../util/constants";

let initialState = {
  language: "en",
  viewProjects: "my",
  allProjects: [],
  myProjects: [],
  submittedRejectedApprovedProjects: [],
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
    case VIEWSUBMITTED:
      return {
        ...state,
        viewProjects: "submitted",
        submittedRejectedApprovedProjects: state.allProjects
          .filter(function(project) {
            return project.status === "SUBMITTED";
          })
          .sort(function(a, b) {
            return a.yearOfCreation < b.yearOfCreation ? 1 : -1;
          }),
      };
    case VIEWAPPROVED:
      return {
        ...state,
        viewProjects: "approved",
        submittedRejectedApprovedProjects: state.allProjects
          .filter(project => project.status === "APPROVED")
          .sort(function(a, b) {
            return a.yearOfCreation < b.yearOfCreation ? 1 : -1;
          }),
      };
    case VIEWREJECTED:
      return {
        ...state,
        viewProjects: "rejected",
        submittedRejectedApprovedProjects: state.allProjects
          .filter(project => project.status === "REJECTED")
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
        isProjectDialogOpen: !state.isProjectDialogOpen,
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
    case DELETEPROJECT:
      return {
        ...state,
        myProjects: state.myProjects.filter(project => project.id !== action.id),
        allProjects: state.allProjects.filter(project => project.id !== action.id),
      };
    case SUBMITREJECTPROJECT:
      return {
        ...state,
        myProjects: state.myProjects.map(project =>
          project.id === action.result.id
            ? {...project, status: action.result.status}
            : project
        ),
        allProjects: state.allProjects.map(project =>
          project.id === action.result.id
            ? {...project, status: action.result.status}
            : project
        ),
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

export function getImageFromId(imageId) {
  let values = {};
  return fetch(imagesURL + "/" + imageId, {
    method: "GET",
  })
    .then(response => response.json())
    .then(result => {
      values = {
        imageId: result.imageId,
        image: result.image,
      };
      return values;
    });
}

export function handledeleteProject(id) {
  return dispatch => {
    return fetch(projectsURL + "/" + id, {
      method: "DELETE",
    }).then(response =>
      response.status === 200 ? dispatch(deleteProject(id)) : console.log("Failed")
    );
  };
}

export function createNewProject() {
  const body = {
    name: "ABCD",
    chairName: "",
    description: "asdadasdasdasd",
    imageId: "",
    userId: "tempuser",
    tags: [],
    fields: [],
  };
  return dispatch => {
    return fetch(projectsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(result => {
        dispatch(createProject());
      });
  };
}

export function handleSubmitProject(id) {
  return dispatch => {
    return fetch(projectsURL + "/submit/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(result => {
        dispatch(submitProject(result));
      });
  };
}

export function handleRejectProject(id) {
  return dispatch => {
    return fetch(projectsURL + "/reject/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(result => {
        dispatch(rejectProject(result));
      });
  };
}
