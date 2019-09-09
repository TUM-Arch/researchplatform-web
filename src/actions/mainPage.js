export const ENGLISH="ENGLISH";
export const GERMAN="GERMAN";

export const changeToEnglish = () => dispatch => 
    dispatch({
        type: ENGLISH
    });

export const changeToGerman = () => dispatch => 
    dispatch({
        type: GERMAN
    });