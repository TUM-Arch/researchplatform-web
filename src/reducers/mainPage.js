import { ENGLISH, GERMAN, VIEWALL, VIEWMY } from '../actions/mainPage';

let initialState = { 
  language: "en",
  viewProjects: "my"
}

export default function mainPage(state = initialState, action) {
    switch (action.type) {
      case ENGLISH:
        return {
          ...state,
          language: "en"
         };
      case GERMAN:
        return {
          ...state,
          language: "de"
         };
      case VIEWALL:
        return {
          ...state,
          viewProjects: "all"
        };
      case VIEWMY:
        return {
          ...state,
          viewProjects: "my"
        }
      default:
        return state
    }
  }

