export const ENGLISH="ENGLISH";
export const GERMAN="GERMAN";
export const VIEWALL="VIEWALL";
export const VIEWMY="VIEWMY";
export const PROJECTDIALOGCLOSE="PROJECTDIALOGCLOSE";
export const CREATEPROJECT="CREATEPROJECT";
export const EDITPROJECT="EDITPROJECT";
export const VIEWPROJECT="VIEWPROJECT";

export const changeToEnglish = () => dispatch => 
    dispatch({
        type: ENGLISH
    });

export const changeToGerman = () => dispatch => 
    dispatch({
        type: GERMAN
    });

export const viewAllProjects = () => dispatch =>
    dispatch({
        type: VIEWALL
    });

export const viewMyProjects = () => dispatch =>
    dispatch({
        type: VIEWMY
    });

export const projectDialogClose = () => dispatch =>
dispatch({
    type: PROJECTDIALOGCLOSE
});

export const createProject = () => dispatch =>
dispatch({
    type: CREATEPROJECT
});

export const editProject = () => dispatch =>
dispatch({
    type: EDITPROJECT
});

export const viewProject = () => dispatch =>
dispatch({
    type: VIEWPROJECT
});