export const ENGLISH="ENGLISH";
export const GERMAN="GERMAN";
export const VIEWALL="VIEWALL";
export const VIEWMY="VIEWMY";

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
