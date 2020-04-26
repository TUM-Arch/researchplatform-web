export const CREATEEDITFIELD = "CREATEEDITFIELD";
export const SETSELECTEDFIELD = "SETSELECTEDFIELD";
export const SETFIELDS = "SETFIELDS";
export const DELETEFIELD = "DELETEFIELD";
export const SETFIELDNAMEEN = "SETFIELDNAMEEN";
export const SETFIELDNAMEDE = "SETFIELDNAMEDE";
export const SETFIELDVALUEEN = "SETFIELDVALUEEN";
export const SETFIELDVALUEDE = "SETFIELDVALUEDE";
export const SETFIELDESCRIPTION = "SETFIELDESCRIPTION";
export const SETFIELDREQUIRED = "SETFIELDREQUIRED";
export const RESETFIELDSSTATE = "RESETFIELDSSTATE";
export const SETNEWFIELD = "SETNEWFIELD";

export const createEditField = () => dispatch =>
  dispatch({
    type: CREATEEDITFIELD,
  });

export const setSelectedField = id => ({
  type: SETSELECTEDFIELD,
  id,
});

export const setFields = fields => ({
  type: SETFIELDS,
  fields,
});

export const deleteField = id => ({
  type: DELETEFIELD,
  id,
});

export const setFieldNameEn = value => ({
  type: SETFIELDNAMEEN,
  value,
});

export const setFieldNameDe = value => ({
  type: SETFIELDNAMEDE,
  value,
});

export const setFieldValueEn = value => ({
  type: SETFIELDVALUEEN,
  value,
});

export const setFieldValueDe = value => ({
  type: SETFIELDVALUEDE,
  value,
});

export const setFieldDescription = value => ({
  type: SETFIELDESCRIPTION,
  value,
});

export const setFieldRequired = value => ({
  type: SETFIELDREQUIRED,
  value,
});

export const resetFieldsState = () => dispatch =>
  dispatch({
    type: RESETFIELDSSTATE,
  });

export const setNewField = () => dispatch =>
  dispatch({
    type: SETNEWFIELD,
  });
