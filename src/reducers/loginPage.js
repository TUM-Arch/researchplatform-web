import {loginURL, logoutURL} from "../util/constants";
import {
  CHANGEUSERID,
  CHANGEPASSWORD,
  SETUSERID,
  SETJWT,
  SETADMIN,
  setUserId,
  setJwt,
  setAdmin,
  changeUserId,
  changePassword,
} from "../actions/loginPage";

let initialState = {
  userId: "",
  isAdmin: "",
  jwt: "",
  selectedUserId: "",
  selectedPassword: "",
};

export default function loginPage(state = initialState, action) {
  switch (action.type) {
    case CHANGEUSERID:
      return {
        ...state,
        selectedUserId: action.value,
      };
    case CHANGEPASSWORD:
      return {
        ...state,
        selectedPassword: action.value,
      };
    case SETUSERID:
      return {
        ...state,
        userId: action.value,
      };
    case SETJWT:
      return {
        ...state,
        jwt: action.value,
      };
    case SETADMIN:
      return {
        ...state,
        isAdmin: action.value,
      };
    default:
      return state;
  }
}

export function attemptLogin(userId, password) {
  let jwt = "";
  let isAdmin = "";
  return dispatch => {
    return fetch(loginURL, {
      method: "POST",
      headers: {
        userId: userId,
        password: password,
      },
    })
      .then(response => {
        if (response.status === 200) {
          jwt = response.headers.get("Authorization");
          isAdmin = response.headers.get("Admin") === "true" ? true : false;
          window.localStorage["isAdmin"] = isAdmin;
          dispatch(setJwt(jwt));
          dispatch(setAdmin(isAdmin));
          dispatch(setUserId(userId));
          dispatch(changeUserId(""));
          dispatch(changePassword(""));
        }
      })
      .then(() => window.location.reload());
  };
}

export function attemptLogout(userId, jwt) {
  return dispatch => {
    return fetch(logoutURL, {
      method: "GET",
      headers: {
        Authorization: jwt,
        userId: userId,
      },
    })
      .then(() => {
        window.localStorage.removeItem("isAdmin");
        dispatch(setJwt(""));
        dispatch(setAdmin(null));
        dispatch(setUserId(""));
      })
      .then(() => window.location.reload());
  };
}
