export const CHANGEUSERID = "CHANGEUSERID";
export const CHANGEPASSWORD = "CHANGEPASSWORD";
export const SETUSERID = "SETUSERID";
export const SETJWT = "SETJWT";
export const SETADMIN = "SETADMIN";
export const SETLOGINALERT = "SETLOGINALERT";

export const changeUserId = value => dispatch =>
  dispatch({
    type: CHANGEUSERID,
    value,
  });

export const changePassword = value => dispatch =>
  dispatch({
    type: CHANGEPASSWORD,
    value,
  });

export const setUserId = value => dispatch =>
  dispatch({
    type: SETUSERID,
    value,
  });

export const setJwt = value => dispatch =>
  dispatch({
    type: SETJWT,
    value,
  });

export const setAdmin = value => dispatch =>
  dispatch({
    type: SETADMIN,
    value,
  });

export const setLoginAlert = value => dispatch =>
  dispatch({
    type: SETLOGINALERT,
    value,
  });
