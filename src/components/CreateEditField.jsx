import React from "react";
import {connect} from "react-redux";
import en from "../translations/en.json";
import de from "../translations/de.json";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {
  createEditField,
  setFieldNameEn,
  setFieldNameDe,
  setFieldValueEn,
  setFieldValueDe,
  setFieldDescription,
  setFieldRequired,
  resetFieldsState,
} from "../actions/settingsPage";
import {saveField} from "../reducers/settingsPage";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  textFields: {
    margin: theme.spacing(2),
  },
});

const CustomTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
})(TextField);

class CreateEditField extends React.Component {
  render() {
    const {
      classes,
      isFormDialogOpen,
      language,
      createEditField,
      saveField,
      selectedField,
      setFieldNameEn,
      setFieldNameDe,
      setFieldValueEn,
      setFieldValueDe,
      setFieldDescription,
      setFieldRequired,
      resetFieldsState,
      fieldNameEn,
      fieldNameDe,
      fieldDescription,
      fieldValueEn,
      fieldValueDe,
      fieldRequired,
      isNewField,
    } = this.props;

    function handleClose() {
      createEditField();
    }

    function handleSave(
      fieldNameEn,
      fieldNameDe,
      fieldDescription,
      fieldValueEn,
      fieldValueDe,
      fieldRequired,
      isNewField,
      id
    ) {
      createEditField();
      saveField(
        fieldNameEn,
        fieldNameDe,
        fieldDescription,
        fieldValueEn,
        fieldValueDe,
        fieldRequired,
        isNewField,
        id
      );
      resetFieldsState();
      window.location.reload();
    }

    const nameMap = {
      nameEn: "Name (ENG)",
      nameDe: "Name (DE)",
      valueEn: "Value (ENG)",
      valueDe: "Value (DE)",
      description: "Description",
      required: "Required Field",
    };

    return (
      <div>
        <Dialog fullWidth maxWidth="md" open={isFormDialogOpen} onClose={createEditField}>
          <DialogTitle>
            {language === "en" ? en.createEditField : de.createEditField}
          </DialogTitle>
          <DialogContent>
            {Object.keys(selectedField).map((keyName, i) => {
              if (keyName === "id" || keyName === "createdAt") {
                return null;
              }
              switch (keyName) {
                case "required":
                  return (
                    <div key={i}>
                      <Typography>{nameMap[keyName]}</Typography>
                      <Checkbox
                        color="secondary"
                        checked={selectedField[keyName]}
                        onChange={evt => {
                          setFieldRequired(evt.target.checked);
                        }}
                      />
                    </div>
                  );
                case "nameEn":
                  return (
                    <div key={i} className={classes.textFields}>
                      <CustomTextField
                        label={nameMap[keyName]}
                        defaultValue={isNewField === true ? "" : selectedField[keyName]}
                        variant="outlined"
                        fullWidth
                        onChange={evt => {
                          setFieldNameEn(evt.target.value);
                        }}
                      />
                    </div>
                  );
                case "nameDe":
                  return (
                    <div key={i} className={classes.textFields}>
                      <CustomTextField
                        label={nameMap[keyName]}
                        defaultValue={isNewField === true ? "" : selectedField[keyName]}
                        variant="outlined"
                        fullWidth
                        onChange={evt => {
                          setFieldNameDe(evt.target.value);
                        }}
                      />
                    </div>
                  );
                case "valueEn":
                  return (
                    <div key={i} className={classes.textFields}>
                      <CustomTextField
                        label={nameMap[keyName]}
                        defaultValue={isNewField === true ? "" : selectedField[keyName]}
                        variant="outlined"
                        fullWidth
                        onChange={evt => {
                          setFieldValueEn(evt.target.value);
                        }}
                      />
                    </div>
                  );
                case "valueDe":
                  return (
                    <div key={i} className={classes.textFields}>
                      <CustomTextField
                        label={nameMap[keyName]}
                        defaultValue={isNewField === true ? "" : selectedField[keyName]}
                        variant="outlined"
                        fullWidth
                        onChange={evt => {
                          setFieldValueDe(evt.target.value);
                        }}
                      />
                    </div>
                  );
                case "description":
                  return (
                    <div key={i} className={classes.textFields}>
                      <CustomTextField
                        label={nameMap[keyName]}
                        defaultValue={isNewField === true ? "" : selectedField[keyName]}
                        variant="outlined"
                        fullWidth
                        onChange={evt => {
                          setFieldDescription(evt.target.value);
                        }}
                      />
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              {language === "en" ? en.cancel : de.cancel}
            </Button>
            <Button
              onClick={() =>
                handleSave(
                  fieldNameEn,
                  fieldNameDe,
                  fieldDescription,
                  fieldValueEn,
                  fieldValueDe,
                  fieldRequired,
                  isNewField,
                  selectedField.id
                )
              }
              color="secondary"
              variant="contained"
            >
              {language === "en" ? en.submit : de.submit}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({
  settingsPage: {
    selectedField,
    isNewField,
    fieldNameEn,
    fieldNameDe,
    fieldDescription,
    fieldValueEn,
    fieldValueDe,
    fieldRequired,
  },
}) => ({
  selectedField,
  isNewField,
  fieldNameEn,
  fieldNameDe,
  fieldDescription,
  fieldValueEn,
  fieldValueDe,
  fieldRequired,
});

const mapDispatchToProps = {
  createEditField: createEditField,
  saveField: saveField,
  setFieldNameEn: setFieldNameEn,
  setFieldNameDe: setFieldNameDe,
  setFieldValueEn: setFieldValueEn,
  setFieldValueDe: setFieldValueDe,
  setFieldDescription: setFieldDescription,
  setFieldRequired: setFieldRequired,
  resetFieldsState: resetFieldsState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(CreateEditField));
