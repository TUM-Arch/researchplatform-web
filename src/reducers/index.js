import {combineReducers} from "redux";
import loginPage from "./loginPage";
import mainPage from "./mainPage";
import errorPage from "./errorPage";
import settingsPage from "./settingsPage";

const rootReducer = combineReducers({
  loginPage,
  mainPage,
  errorPage,
  settingsPage,
});

export default rootReducer;
