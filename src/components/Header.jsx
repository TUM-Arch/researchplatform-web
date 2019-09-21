import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import en from "../translations/en.json";
import de from "../translations/de.json";
import TUMLogo from "../resources/tum-logo.svg";
import {
  AppBar,
  Button,
  Link,
  MenuItem,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {fade} from "@material-ui/core/styles";
import {withStyles} from "@material-ui/styles";
import Downshift from "downshift";
import deburr from "lodash/deburr";
import {changeToEnglish, changeToGerman} from "../actions/mainPage";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 5,
  },
  image: {
    marginRight: theme.spacing(2),
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    flexGrow: 1,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "auto",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
});

const isAdmin = true; //TODO: Map this to user isAdmin property

//TODO: Replace this with project indexes
const suggestions = [
  {label: "Afghanistan"},
  {label: "Aland Islands"},
  {label: "Albania"},
];

function renderInput(inputProps) {
  const {InputProps, classes, ref, ...other} = inputProps;
  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestionProps) {
  const {suggestion, index, itemProps, highlightedIndex, selectedItem} = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}

function getSuggestions(value, {showEmpty = false} = {}) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 && !showEmpty
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;
        if (keep) {
          count += 1;
        }
        return keep;
      });
}

function Header(props) {
  const {classes, changeToEn, changeToDe, language} = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <img src={TUMLogo} alt="TUM logo" className={classes.image} />
          <Typography variant="h6" className={classes.title}>
            {language === "en" ? en.departmentName : de.departmentName}
          </Typography>

          <Downshift id="downshift-simple">
            {({
              getInputProps,
              getItemProps,
              getLabelProps,
              getMenuProps,
              highlightedIndex,
              inputValue,
              isOpen,
              selectedItem,
            }) => {
              const {onBlur, onFocus, ...inputProps} = getInputProps({
                placeholder:
                  language === "en" ? en.searchPlaceholder : de.searchPlaceholder,
              });

              return (
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>

                  {renderInput({
                    fullWidth: true,
                    classes,
                    InputLabelProps: getLabelProps({shrink: true}),
                    InputProps: {onBlur, onFocus},
                    inputProps,
                  })}

                  <div {...getMenuProps()}>
                    {isOpen ? (
                      <Paper className={classes.paper} square>
                        {getSuggestions(inputValue).map((suggestion, index) =>
                          renderSuggestion({
                            suggestion,
                            index,
                            itemProps: getItemProps({item: suggestion.label}),
                            highlightedIndex,
                            selectedItem,
                          })
                        )}
                      </Paper>
                    ) : null}
                  </div>
                </div>
              );
            }}
          </Downshift>
          {isAdmin && (
            <Button
              className={classes.menuButton}
              color="inherit"
              onClick={() => changeToEn()}
            >
              Admin
            </Button>
          )}
          <Link component="button" onClick={() => changeToEn()}>
            <Typography variant="body1">en</Typography>
          </Link>
          <Typography variant="h6">
            {" "}
            <span>&nbsp;|&nbsp;</span>{" "}
          </Typography>
          <Link component="button" onClick={() => changeToDe()}>
            <Typography variant="body1">de</Typography>
          </Link>
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

const mapStateToProps = ({mainPage: {language}}) => ({
  language,
});

const mapDispatchToProps = {
  changeToEn: changeToEnglish,
  changeToDe: changeToGerman,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(Header));
