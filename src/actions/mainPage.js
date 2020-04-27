export const ENGLISH = "ENGLISH";
export const GERMAN = "GERMAN";
export const VIEWALL = "VIEWALL";
export const VIEWMY = "VIEWMY";
export const VIEWSUBMITTED = "VIEWSUBMITTED";
export const VIEWAPPROVED = "VIEWAPPROVED";
export const VIEWREJECTED = "VIEWREJECTED";
export const PROJECTDIALOGCLOSE = "PROJECTDIALOGCLOSE";
export const CREATEPROJECT = "CREATEPROJECT";
export const EDITPROJECT = "EDITPROJECT";
export const VIEWPROJECT = "VIEWPROJECT";
export const DELETEPROJECT = "DELETEPROJECT";
export const SUBMITREJECTPROJECT = "SUBMITREJECTPROJECT";
export const SETSELECTEDPROJECT = "SETSELECTEDPROJECT";
export const SETWINDOWDIMS = "SETWINDOWDIMS";
export const UPDATE_PROJECTS = "UPDATE_PROJECTS";

export const changeToEnglish = () => dispatch =>
  dispatch({
    type: ENGLISH,
  });

export const changeToGerman = () => dispatch =>
  dispatch({
    type: GERMAN,
  });

export const viewAllProjects = () => dispatch =>
  dispatch({
    type: VIEWALL,
  });

export const viewMyProjects = () => dispatch =>
  dispatch({
    type: VIEWMY,
  });

export const viewSubmittedProjects = () => dispatch =>
  dispatch({
    type: VIEWSUBMITTED,
  });

export const viewApprovedProjects = () => dispatch =>
  dispatch({
    type: VIEWAPPROVED,
  });

export const viewRejectedProjects = () => dispatch =>
  dispatch({
    type: VIEWREJECTED,
  });

export const projectDialogClose = () => dispatch =>
  dispatch({
    type: PROJECTDIALOGCLOSE,
  });

export const createProject = () => dispatch =>
  dispatch({
    type: CREATEPROJECT,
  });

export const editProject = () => dispatch =>
  dispatch({
    type: EDITPROJECT,
  });

export const viewProject = () => dispatch =>
  dispatch({
    type: VIEWPROJECT,
  });

export const deleteProject = id => dispatch =>
  dispatch({
    type: DELETEPROJECT,
    id,
  });

export const submitProject = result => dispatch =>
  dispatch({
    type: SUBMITREJECTPROJECT,
    result,
  });

export const rejectProject = result => dispatch =>
  dispatch({
    type: SUBMITREJECTPROJECT,
    result,
  });

export const setSelectedProject = value => dispatch =>
  dispatch({
    type: SETSELECTEDPROJECT,
    value,
  });

export const setWindowDimensions = values => dispatch =>
  dispatch({
    type: SETWINDOWDIMS,
    values,
  });

export const updateProjects = values => ({
  type: UPDATE_PROJECTS,
  values,
});
