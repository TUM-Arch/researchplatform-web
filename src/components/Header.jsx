import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import en from '../translations/en.json';
import de from '../translations/de.json';
import { changeToEnglish, changeToGerman } from '../actions/mainPage';
import TUMLogo from '../theme/TUM.gif'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  image: {
    marginRight: theme.spacing(2)
  }
}));

const isAdmin = true; //TODO: Map this to user isAdmin property

function Header(props) {
  const classes = useStyles();
  const {changeToEn, changeToDe, language} = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <img src={TUMLogo} alt="TUM logo" className={classes.image}/>
          <Typography variant="h6" className={classes.title}>
          { language === 'en' ? ( en.departmentName ) : ( de.departmentName ) }
          </Typography>
          {  isAdmin &&
            <Button className={classes.menuButton} variant= "contained" onClick={ () => changeToEn() }>Admin</Button>
          }
          <ButtonGroup variant="contained">
            <Button onClick={ () => changeToEn() }>en</Button>
            <Button onClick={ () => changeToDe() }>de</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
    changeToDe: PropTypes.func.isRequired,
    changeToEn: PropTypes.func.isRequired,
    language: PropTypes.string
};

const mapStateToProps = ({
    mainPage: {
        language
    }}  
) => ({
    language
});

const mapDispatchToProps = {
    changeToEn: changeToEnglish , changeToDe: changeToGerman
};

export default connect(mapStateToProps, mapDispatchToProps) (Header);