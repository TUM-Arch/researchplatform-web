import {
  CREATEEDITFIELD,
  SETSELECTEDFIELD,
  SETFIELDS,
  DELETEFIELD,
  SETFIELDNAMEEN,
  SETFIELDNAMEDE,
  SETFIELDVALUEEN,
  SETFIELDVALUEDE,
  SETFIELDESCRIPTION,
  SETFIELDREQUIRED,
  SETFIELDLENGTH,
  RESETFIELDSSTATE,
  SETNEWFIELD,
  setFields,
  deleteField,
  createEditField,
} from "../actions/settingsPage";
import {formfieldsURL} from "../util/constants";

let initialState = {
  isFormDialogOpen: false,
  formFields: [],
  selectedField: {
    nameEn: "",
    nameDe: "",
    valueEn: "",
    valueDe: "",
    description: "",
    length: null,
    required: false,
  },
  isNewField: false,
  fieldNameEn: "",
  fieldNameDe: "",
  fieldDescription: "",
  fieldValueEn: "",
  fieldValueDe: "",
  fieldRequired: false,
  fieldLength: null,
};

export default function mainPage(state = initialState, action) {
  switch (action.type) {
    case SETFIELDS:
      return {
        ...state,
        formFields: action.fields.fieldsList,
      };
    case DELETEFIELD:
      return {
        ...state,
        formFields: state.formFields.filter(field => field.id !== action.id),
      };
    case CREATEEDITFIELD:
      return {
        ...state,
        isFormDialogOpen: !state.isFormDialogOpen,
      };
    case SETNEWFIELD:
      return {
        ...state,
        isNewField: true,
      };
    case SETSELECTEDFIELD:
      const field = state.formFields.find(field => field.id === action.id);
      return {
        ...state,
        isNewField: false,
        selectedField: state.formFields.find(field => field.id === action.id),
        fieldNameEn: field.nameEn,
        fieldNameDe: field.nameDe,
        fieldDescription: field.description,
        fieldValueEn: field.valueEn,
        fieldValueDe: field.valueDe,
        fieldRequired: field.required,
        fieldLength: field.length,
      };
    case SETFIELDNAMEEN:
      return {
        ...state,
        fieldNameEn: action.value,
      };
    case SETFIELDNAMEDE:
      return {
        ...state,
        fieldNameDe: action.value,
      };
    case SETFIELDVALUEEN:
      return {
        ...state,
        fieldValueEn: action.value,
      };
    case SETFIELDVALUEDE:
      return {
        ...state,
        fieldValueDe: action.value,
      };
    case SETFIELDESCRIPTION:
      return {
        ...state,
        fieldDescription: action.value,
      };
    case SETFIELDREQUIRED:
      return {
        ...state,
        fieldRequired: action.value,
        selectedField: {
          ...state.selectedField,
          required: action.value,
        },
      };
    case SETFIELDLENGTH:
      return {
        ...state,
        fieldLength: action.value,
      };
    case RESETFIELDSSTATE:
      return {
        ...state,
        selectedField: {
          nameEn: "",
          nameDe: "",
          valueEn: "",
          valueDe: "",
          description: "",
          required: false,
          length: null,
        },
        isNewField: false,
        fieldNameEn: "",
        fieldNameDe: "",
        fieldDescription: "",
        fieldValueEn: "",
        fieldValueDe: "",
        fieldRequired: false,
        fieldLength: null,
      };
    default:
      return state;
  }
}

export function getCurrentFormfields() {
  let values = {};
  return dispatch => {
    return fetch(formfieldsURL, {
      method: "GET",
    })
      .then(response => response.json())
      .then(result => {
        values = {
          numberOfFields: result.numberOfFields,
          fieldsList: result.fieldsList,
        };
        dispatch(setFields(values));
      });
  };
}

export function handleDeleteField(id) {
  return dispatch => {
    return fetch(formfieldsURL + "/" + id, {
      method: "DELETE",
    }).then(response =>
      response.status === 200 ? dispatch(deleteField(id)) : console.log("Failed")
    );
  };
}

export function saveField(
  fieldNameEn,
  fieldNameDe,
  fieldDescription,
  fieldValueEn,
  fieldValueDe,
  fieldRequired,
  fieldLength,
  isNewField,
  id
) {
  const url = isNewField === true ? formfieldsURL : formfieldsURL + "/" + id;
  const body = {
    nameEn: fieldNameEn,
    nameDe: fieldNameDe,
    valueEn: fieldValueEn,
    valueDe: fieldValueDe,
    description: fieldDescription,
    required: fieldRequired,
    length: fieldLength === null ? 50 : fieldLength,
  };
  return dispatch => {
    return fetch(url, {
      method: isNewField === true ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(result => {
        dispatch(createEditField());
      });
  };
}
