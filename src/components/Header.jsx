import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import en from "../translations/en.json";
import de from "../translations/de.json";
import TUMLogo from "../resources/tum-logo.svg";
import {
  AppBar,
  IconButton,
  Link,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/SettingsApplications";
import {withStyles} from "@material-ui/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {isMobile} from "react-device-detect";
import {
  changeToEnglish,
  changeToGerman,
  viewProject,
  setSelectedProject,
} from "../actions/mainPage";
import {openProjectOnSearch} from "../reducers/mainPage";
import AuthAdmin from "./AuthAdmin";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerActions: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerActionsItems: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 5,
  },
  image: {
    marginRight: theme.spacing(2),
  },
  searchInput: {},
});

const isAdmin = AuthAdmin();

const SearchTextField = withStyles({
  root: {
    "& label": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
})(TextField);

function Header(props) {
  const {
    classes,
    changeToEn,
    changeToDe,
    language,
    history,
    searchEnabled,
    settingsEnabled,
    allProjects,
    openProjectOnSearch,
    viewProject,
    setSelectedProject,
  } = props;

  function handleViewSettingsPage() {
    history.push("/manage");
    window.location.reload();
  }

  function logout() {
    sessionStorage.removeItem("isAdmin");
    window.location.reload();
  }

  function handleSearchSelect(e, value) {
    const project = allProjects.find(project => {
      return project.name === value;
    });
    if (project && project.name === value) {
      if (project.imageId) {
        openProjectOnSearch(project.id, project.imageId);
      } else {
        viewProject(project.id);
        setSelectedProject(project.id);
      }
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <img src={TUMLogo} alt="TUM logo" className={classes.image} />
          {isMobile === false ? (
            <Typography variant="body1" className={classes.title}>
              {language === "en" ? en.departmentName : de.departmentName}
            </Typography>
          ) : null}
          {searchEnabled && isAdmin && !isMobile && (
            <Autocomplete
              id="search-input"
              className={classes.searchInput}
              freeSolo
              fullWidth
              options={allProjects.map(project => project.name)}
              onChange={(event, value) => handleSearchSelect(event, value)}
              renderInput={params => (
                <SearchTextField
                  {...params}
                  label="Search"
                  margin="normal"
                  variant="filled"
                  color="secondary"
                />
              )}
            />
          )}
          <div className={classes.headerActions}>
            <Link component="button" onClick={() => changeToEn()}>
              <Typography>en</Typography>
            </Link>
            <Typography>
              {" "}
              <span>&nbsp;|&nbsp;</span>{" "}
            </Typography>
            <Link component="button" onClick={() => changeToDe()}>
              <Typography>de</Typography>
            </Link>
            {settingsEnabled && isAdmin && (
              <IconButton
                color="inherit"
                onClick={() => handleViewSettingsPage()}
                className={classes.headerActionsItems}
              >
                <SettingsIcon />
              </IconButton>
            )}
            <Link
              component="button"
              onClick={() => logout()}
              className={classes.headerActionsItems}
            >
              <Typography>{language === "en" ? en.logout : de.logout}</Typography>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  changeToDe: PropTypes.func.isRequired,
  changeToEn: PropTypes.func.isRequired,
  language: PropTypes.string,
};

const mapStateToProps = ({mainPage: {language, allProjects}}) => ({
  language,
  allProjects,
});

const mapDispatchToProps = {
  changeToEn: changeToEnglish,
  changeToDe: changeToGerman,
  openProjectOnSearch: openProjectOnSearch,
  viewProject: viewProject,
  setSelectedProject: setSelectedProject,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(Header));
