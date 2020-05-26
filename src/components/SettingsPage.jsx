import React from "react";
import {connect} from "react-redux";
import en from "../translations/en.json";
import de from "../translations/de.json";
import {withStyles} from "@material-ui/styles";
import {isMobile} from "react-device-detect";
import Header from "./Header";
import {getCurrentFormfields, handleDeleteField} from "../reducers/settingsPage";
import {createEditField, setSelectedField, setNewField} from "../actions/settingsPage";
import {setWindowDimensions} from "../actions/mainPage";
import {Button, IconButton, Tooltip, TextField, Typography} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CreateEditField from "./CreateEditField";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  rootMobile: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  settingsLayout: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(2),
    width: "75%",
  },
  titleLayout: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  formFieldsLayout: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(2),
  },
  formField: {
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    justifyContent: "center",
    alignItems: "baseline",
  },
  settingsLayoutText: {
    margin: theme.spacing(2),
  },
  icon: {
    margin: theme.spacing(1),
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

class SettingsPage extends React.Component {
  componentWillMount = () => {
    this.props.getCurrentFormfields(this.props.jwt);
    this.updateDimensions();
  };
  componentDidMount = () => {
    window.addEventListener("resize", this.updateDimensions);
  };
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions);
  };
  updateDimensions = () => {
    const {setWindowDimensions} = this.props;
    const values = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    setWindowDimensions(values);
  };

  render() {
    const {
      classes,
      language,
      jwt,
      formFields,
      isFormDialogOpen,
      history,
      createEditField,
      setSelectedField,
      handleDeleteField,
      setNewField,
    } = this.props;

    function handleEdit(id) {
      setSelectedField(id);
      createEditField();
    }

    function handleCreate() {
      setNewField();
      createEditField();
    }

    function handleDelete(id) {
      handleDeleteField(id, jwt).then(() => {
        window.location.reload();
      });
    }

    return (
      <div>
        <Header history={history} searchEnabled={false} settingsEnabled={false} />
        <div className={isMobile === true ? classes.rootMobile : classes.root}>
          <div className={classes.settingsLayout}>
            <div className={classes.titleLayout}>
              <Typography
                variant="h5"
                color="secondary"
                className={classes.settingsLayoutText}
              >
                {language === "en" ? en.settingsTitle : de.settingsTitle}
              </Typography>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => handleCreate()}
              >
                {language === "en" ? en.newField : de.newField}
              </Button>
            </div>
            <div className={classes.formFieldsLayout}>
              {formFields.map((field, i) => (
                <div key={field.id} className={classes.formField}>
                  <CustomTextField
                    id="form-field"
                    label={field.nameEn + " | " + field.nameDe}
                    style={{margin: 8}}
                    defaultValue={field.valueEn + " | " + field.valueDe}
                    helperText={field.description}
                    required={field.required}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    color="secondary"
                  />
                  <Tooltip placement="top" title="Edit">
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEdit(field.id)}
                      className={classes.icon}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip placement="top" title="Delete">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(field.id)}
                      className={classes.icon}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        </div>
        <CreateEditField isFormDialogOpen={isFormDialogOpen} language={language} />
      </div>
    );
  }
}

const mapStateToProps = ({
  loginPage: {jwt},
  mainPage: {language},
  settingsPage: {formFields, isFormDialogOpen},
}) => ({
  jwt,
  language,
  formFields,
  isFormDialogOpen,
});

const mapDispatchToProps = {
  getCurrentFormfields: getCurrentFormfields,
  createEditField: createEditField,
  setWindowDimensions: setWindowDimensions,
  handleDeleteField: handleDeleteField,
  setSelectedField: setSelectedField,
  setNewField: setNewField,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(SettingsPage));
