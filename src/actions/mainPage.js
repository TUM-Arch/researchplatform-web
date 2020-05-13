export const ENGLISH = "ENGLISH";
export const GERMAN = "GERMAN";
export const VIEWALL = "VIEWALL";
export const VIEWMY = "VIEWMY";
export const VIEWSUBMITTED = "VIEWSUBMITTED";
export const VIEWAPPROVED = "VIEWAPPROVED";
export const VIEWREJECTED = "VIEWREJECTED";
export const PROJECTDIALOGCLOSE = "PROJECTDIALOGCLOSE";
export const CREATEPROJECT = "CREATEPROJECT";
export const NEWPROJECTCREATED = "NEWPROJECTCREATED";
export const EDITPROJECT = "EDITPROJECT";
export const UPDATEPROJECT = "UPDATEPROJECT";
export const VIEWPROJECT = "VIEWPROJECT";
export const DELETEPROJECT = "DELETEPROJECT";
export const SUBMITREJECTPROJECT = "SUBMITREJECTPROJECT";
export const SETSELECTEDPROJECT = "SETSELECTEDPROJECT";
export const SETWINDOWDIMS = "SETWINDOWDIMS";
export const UPDATE_PROJECTS = "UPDATE_PROJECTS";
export const SETPROJECTNAME = "SETPROJECTNAME";
export const SETPROJECTCHAIRNAME = "SETPROJECTCHAIRNAME";
export const SETPROJECTDESCRIPTION = "SETPROJECTDESCRIPTION";
export const SETPROJECTIMAGEID = "SETPROJECTIMAGEID";
export const DELETEPROJECTIMAGE = "DELETEPROJECTIMAGE";
export const SETPROJECTTAG = "SETPROJECTTAG";
export const DELETEPROJECTTAG = "DELETEPROJECTTAG";
export const SETPROJECTFIELDS = "SETPROJECTFIELDS";
export const SETPROJECTFIELDENVALUE = "SETPROJECTFIELDENVALUE";
export const SETPROJECTFIELDDEVALUE = "SETPROJECTFIELDDEVALUE";
export const SETPROJECTLANGUAGECHOICE = "SETPROJECTLANGUAGECHOICE";
export const DUMMY = "DUMMY";

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

export const newProjectCreated = result => dispatch =>
  dispatch({
    type: NEWPROJECTCREATED,
    result,
  });

export const editProject = (id, imageName) => dispatch =>
  dispatch({
    type: EDITPROJECT,
    id,
    imageName,
  });

export const updateProject = result => dispatch =>
  dispatch({
    type: UPDATEPROJECT,
    result,
  });

export const viewProject = (id, imageName) => dispatch =>
  dispatch({
    type: VIEWPROJECT,
    id,
    imageName,
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

export const setProjectName = value => dispatch =>
  dispatch({
    type: SETPROJECTNAME,
    value,
  });

export const setProjectChairName = value => dispatch =>
  dispatch({
    type: SETPROJECTCHAIRNAME,
    value,
  });

export const setProjectDescription = value => dispatch =>
  dispatch({
    type: SETPROJECTDESCRIPTION,
    value,
  });

export const setProjectImageId = (imageId, projectId) => dispatch =>
  dispatch({
    type: SETPROJECTIMAGEID,
    imageId,
    projectId,
  });

export const deleteProjectImage = () => dispatch =>
  dispatch({
    type: DELETEPROJECTIMAGE,
  });

export const setProjectTag = value => dispatch =>
  dispatch({
    type: SETPROJECTTAG,
    value,
  });

export const deleteProjectTag = value => dispatch =>
  dispatch({
    type: DELETEPROJECTTAG,
    value,
  });

export const setProjectFields = values => dispatch =>
  dispatch({
    type: SETPROJECTFIELDS,
    values,
  });

export const setProjectFieldEnValue = (id, value) => dispatch =>
  dispatch({
    type: SETPROJECTFIELDENVALUE,
    id,
    value,
  });

export const setProjectFieldDeValue = (id, value) => dispatch =>
  dispatch({
    type: SETPROJECTFIELDDEVALUE,
    id,
    value,
  });

export const setprojectLanguageChoice = value => dispatch =>
  dispatch({
    type: SETPROJECTLANGUAGECHOICE,
    value,
  });

export const dummyDispatch = () => dispatch =>
  dispatch({
    type: DUMMY,
  });
