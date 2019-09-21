import {combineReducers} from "redux";
import loginPage from "./loginPage";
import mainPage from "./mainPage";
import errorPage from "./errorPage";

const rootReducer = combineReducers({
  loginPage,
  mainPage,
  errorPage,
});

export default rootReducer;
