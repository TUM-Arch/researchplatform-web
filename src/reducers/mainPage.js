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
  SETPROJECTNAME,
  SETPROJECTCHAIRNAME,
  SETPROJECTDESCRIPTION,
  SETPROJECTIMAGEID,
  DELETEPROJECTIMAGE,
  SETPROJECTTAG,
  DELETEPROJECTTAG,
  SETPROJECTFIELDS,
  SETWINDOWDIMS,
  UPDATE_PROJECTS,
  SETPROJECTFIELDENVALUE,
  SETPROJECTFIELDDEVALUE,
  SETPROJECTLANGUAGECHOICE,
  SETSELECTEDPROJECTIMAGESTRING,
  SETUSERID,
  DUMMY,
  newProjectCreated,
  updateProject,
  updateProjects,
  deleteProject,
  submitProject,
  rejectProject,
  setProjectFields,
  setProjectImageId,
  setSelectedProjectImageString,
  setSelectedProject,
  viewProject,
} from "../actions/mainPage";
import {projectsURL, formfieldsURL, imagesURL} from "../util/constants";
import {setAdmin, setJwt, setUserId} from "../actions/loginPage";

let initialState = {
  language: "en",
  viewProjects: "my",
  allProjects: [],
  myProjects: [],
  submittedProjects: [],
  rejectedProjects: [],
  approvedProjects: [],
  userId: "",
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
  projectLanguageChoice: "en",
  selectedProjectImageString: "",
  dummy: true,
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
        myProjects: state.allProjects.filter(function(project) {
          return project.userId === state.userId;
        }),
      };
    case VIEWSUBMITTED:
      return {
        ...state,
        viewProjects: "submitted",
      };
    case VIEWAPPROVED:
      return {
        ...state,
        viewProjects: "approved",
      };
    case VIEWREJECTED:
      return {
        ...state,
        viewProjects: "rejected",
      };
    case PROJECTDIALOGCLOSE:
      return {
        ...state,
        isProjectDialogOpen: false,
        projectName: "",
        projectChairName: "",
        projectDescription: "",
        projectImageId: "",
        projectTags: [],
        projectFields: [],
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
      const projectInSight = state.allProjects.find(project => project.id === action.id);
      return {
        ...state,
        projectDialogState: "view",
        isProjectDialogOpen: true,
        projectImageId: projectInSight.imageId,
        projectTags: projectInSight.tags,
        projectFields: projectInSight.fields,
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
        submittedProjects: state.submittedProjects.filter(
          project => project.id !== action.id
        ),
        rejectedProjects: state.rejectedProjects.filter(
          project => project.id !== action.id
        ),
        approvedProjects: state.approvedProjects.filter(
          project => project.id !== action.id
        ),
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
        submittedProjects: state.allProjects
          .map(project =>
            project.id === action.result.id
              ? {...project, status: action.result.status}
              : project
          )
          .filter(project => project.status === "SUBMITTED")
          .sort(function(a, b) {
            return a.yearOfCreation < b.yearOfCreation ? 1 : -1;
          }),
        rejectedProjects: state.allProjects
          .map(project =>
            project.id === action.result.id
              ? {...project, status: action.result.status}
              : project
          )
          .filter(project => project.status === "REJECTED")
          .sort(function(a, b) {
            return a.yearOfCreation < b.yearOfCreation ? 1 : -1;
          }),
        approvedProjects: state.allProjects
          .map(project =>
            project.id === action.result.id
              ? {...project, status: action.result.status}
              : project
          )
          .filter(project => project.status === "APPROVED")
          .sort(function(a, b) {
            return a.yearOfCreation < b.yearOfCreation ? 1 : -1;
          }),
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
        submittedProjects: action.values.projectsList
          .filter(function(project) {
            return project.status === "SUBMITTED";
          })
          .sort(function(a, b) {
            return a.yearOfCreation < b.yearOfCreation ? 1 : -1;
          }),
        rejectedProjects: action.values.projectsList
          .filter(project => project.status === "REJECTED")
          .sort(function(a, b) {
            return a.yearOfCreation < b.yearOfCreation ? 1 : -1;
          }),
        approvedProjects: action.values.projectsList
          .filter(project => project.status === "APPROVED")
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
        myProjects: state.myProjects.map(project =>
          project.id === action.projectId
            ? {...project, imageId: action.imageId}
            : project
        ),
        allProjects: state.allProjects.map(project =>
          project.id === action.projectId
            ? {...project, imageId: action.imageId}
            : project
        ),
      };

    case DELETEPROJECTIMAGE:
      return {
        ...state,
        projectImageId: "",
      };
    case SETPROJECTTAG:
      return {
        ...state,
        projectTags: [...state.projectTags, action.value],
      };
    case DELETEPROJECTTAG:
      return {
        ...state,
        projectTags: state.projectTags.filter(tag => tag !== action.value),
      };
    case SETPROJECTFIELDS:
      return {
        ...state,
        projectFields: action.values.fieldsList,
      };
    case SETPROJECTFIELDENVALUE:
      return {
        ...state,
        projectFields: state.projectFields.map(projectField =>
          projectField.id === action.id
            ? {...projectField, valueEn: action.value}
            : projectField
        ),
      };
    case SETPROJECTFIELDDEVALUE:
      return {
        ...state,
        projectFields: state.projectFields.map(projectField =>
          projectField.id === action.id
            ? {...projectField, valueDe: action.value}
            : projectField
        ),
      };
    case SETPROJECTLANGUAGECHOICE:
      return {
        ...state,
        projectLanguageChoice: action.value,
      };
    case SETSELECTEDPROJECTIMAGESTRING:
      return {
        ...state,
        selectedProjectImageString: action.value,
      };
    case SETUSERID:
      return {
        ...state,
        userId: action.value,
      };
    case DUMMY:
      return {
        ...state,
        dummy: !state.dummy,
      };
    default:
      return state;
  }
}

export function getAllProjects(isAdmin, jwt, userId) {
  let values = {};
  let projectsUrl = isAdmin ? projectsURL : projectsURL + "/my";

  let invalidJwt = () => {
    let error = new Error();
    error.name = "InvalidJWT";
    return error;
  };

  return dispatch => {
    return fetch(projectsUrl, {
      method: "GET",
      headers: {
        Authorization: jwt,
        userId: userId,
      },
    })
      .then(response => {
        if (response.status === 200) return response.json();
        else throw invalidJwt();
      })
      .then(result => {
        values = {
          numberOfProjects: result.numberOfProjects,
          projectsList: result.projectsList,
        };
        dispatch(updateProjects(values));
      })
      .catch(error => {
        if (error.name === "InvalidJWT") {
          window.localStorage.removeItem("isAdmin");
          dispatch(setJwt(""));
          dispatch(setAdmin(null));
          dispatch(setUserId(""));
          window.location.reload();
        }
      });
  };
}

export function handledeleteProject(id, jwt) {
  return dispatch => {
    return fetch(projectsURL + "/" + id, {
      method: "DELETE",
      headers: {
        Authorization: jwt,
      },
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
  userId,
  jwt
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
        Authorization: jwt,
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
  id,
  jwt
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
        Authorization: jwt,
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(result => {
        dispatch(updateProject(result));
      });
  };
}

export function handleSubmitProject(id, jwt) {
  return dispatch => {
    return fetch(projectsURL + "/submit/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
    })
      .then(response => response.json())
      .then(result => {
        dispatch(submitProject(result));
      });
  };
}

export function handleRejectProject(id, jwt) {
  return dispatch => {
    return fetch(projectsURL + "/reject/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
    })
      .then(response => response.json())
      .then(result => {
        dispatch(rejectProject(result));
      });
  };
}

export function getCurrentFormfields(jwt) {
  let values = {};
  return dispatch => {
    return fetch(formfieldsURL, {
      method: "GET",
      headers: {
        Authorization: jwt,
      },
    })
      .then(response => response.json())
      .then(result => {
        values = {
          numberOfFields: result.numberOfFields,
          fieldsList: result.fieldsList,
        };
        dispatch(setProjectFields(values));
      });
  };
}

export function getImageFromId(imageId, jwt) {
  return fetch(imagesURL + "/" + imageId, {
    method: "GET",
    headers: {
      Authorization: jwt,
    },
  })
    .then(response => response.json())
    .then(result => {
      return result;
    });
}

export function openProjectOnSearch(id, imageId, jwt) {
  return dispatch => {
    return fetch(imagesURL + "/" + imageId, {
      method: "GET",
      headers: {
        Authorization: jwt,
      },
    })
      .then(response => response.json())
      .then(result => {
        dispatch(setSelectedProjectImageString(result.image));
      })
      .then(dispatch(viewProject(id)))
      .then(dispatch(setSelectedProject(id)));
  };
}

export function handleSetProjectImage(body, jwt) {
  return dispatch => {
    return fetch(imagesURL, {
      method: "POST",
      headers: {
        Authorization: jwt,
      },
      body: body,
    })
      .then(response =>
        response.status === 200 ? response.json() : console.log("Failed")
      )
      .then(result => {
        dispatch(setProjectImageId(result.imageId, body.get("projectId")));
        return result;
      });
  };
}
