import { ENGLISH, GERMAN } from '../actions/mainPage';

let initialState = { 
  language: "en",
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
      default:
        return state
    }
  }

