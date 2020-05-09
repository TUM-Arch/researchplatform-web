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
  NEWPROJECTCREATED,
  VIEWPROJECT,
  EDITPROJECT,
  UPDATEPROJECT,
  DELETEPROJECT,
  SUBMITREJECTPROJECT,
  SETSELECTEDPROJECT,
  SETPROJECTCHAIRNAME,
  SETPROJECTDESCRIPTION,
  SETPROJECTIMAGEID,
  SETWINDOWDIMS,
  UPDATE_PROJECTS,
  SETPROJECTNAME,
  newProjectCreated,
  updateProject,
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
  windowDims: {
    width: "",
    height: "",
  },
  sortByYear: "",
  selectedProject: {
    name: "",
    chairName: "",
    description: "",
    imageId: "",
    userId: "",
    tags: [],
    fields: [],
    status: "",
  },
  projectName: "",
  projectChairName: "",
  projectDescription: "",
  projectImageId: "",
  projectTags: [],
  projectFields: [],
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
        isProjectDialogOpen: true,
      };
    case NEWPROJECTCREATED:
      return {
        ...state,
        projectDialogState: "",
        isProjectDialogOpen: false,
        myProjects: state.myProjects.concat(action.result),
        allProjects: state.allProjects.concat(action.result),
        projectName: "",
        projectChairName: "",
        projectDescription: "",
        projectImageId: "",
        projectTags: [],
        projectFields: [],
      };
    case VIEWPROJECT:
      return {
        ...state,
        projectDialogState: "view",
        isProjectDialogOpen: true,
      };
    case EDITPROJECT:
      const project = state.allProjects.find(project => project.id === action.id);
      return {
        ...state,
        projectDialogState: "edit",
        isProjectDialogOpen: true,
        projectName: project.name,
        projectChairName: project.chairName,
        projectDescription: project.description,
        projectImageId: project.imageId,
        projectTags: project.tags,
        projectFields: project.fields,
      };
    case UPDATEPROJECT:
      return {
        ...state,
        myProjects: state.myProjects.map(project =>
          project.id === action.result.id ? action.result : project
        ),
        allProjects: state.allProjects.map(project =>
          project.id === action.result.id ? action.result : project
        ),
        projectDialogState: "",
        isProjectDialogOpen: false,
        projectName: "",
        projectChairName: "",
        projectDescription: "",
        projectImageId: "",
        projectTags: [],
        projectFields: [],
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
        selectedProject: state.allProjects.find(project => project.id === action.value),
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
    case SETPROJECTNAME:
      return {
        ...state,
        projectName: action.value,
      };
    case SETPROJECTCHAIRNAME:
      return {
        ...state,
        projectChairName: action.value,
      };
    case SETPROJECTDESCRIPTION:
      return {
        ...state,
        projectDescription: action.value,
      };
    case SETPROJECTIMAGEID:
      return {
        ...state,
        projectImageId: action.value,
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

export function createNewProject(
  projectName,
  projectChairName,
  projectDescription,
  projectImageId,
  projectTags,
  projectFields,
  userId
) {
  const body = {
    name: projectName,
    chairName: projectChairName,
    description: projectDescription,
    imageId: projectImageId,
    userId: userId,
    tags: projectTags,
    fields: projectFields,
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
        dispatch(newProjectCreated(result));
      });
  };
}

export function handleEditProject(
  projectName,
  projectChairName,
  projectDescription,
  projectImageId,
  projectTags,
  projectFields,
  userId,
  id
) {
  const body = {
    name: projectName,
    chairName: projectChairName,
    description: projectDescription,
    imageId: projectImageId,
    userId: userId,
    tags: projectTags,
    fields: projectFields,
  };
  return dispatch => {
    return fetch(projectsURL + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(result => {
        dispatch(updateProject(result));
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
