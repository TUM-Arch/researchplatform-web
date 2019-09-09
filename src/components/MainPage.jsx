import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import en from '../translations/en.json';
import de from '../translations/de.json';
import { changeToEnglish, changeToGerman } from '../actions/mainPage';

function MainPage(props) {
    const {changeToEn, changeToDe, language} = props;
    return (
        <div>
            <Button color="primary" variant= "contained" onClick={ language === 'en' ? () => changeToDe() : () => changeToEn() }>Change</Button>
            { language === 'en' ? ( en.departmentName ) : ( de.departmentName ) }
        </div>
    );
}

MainPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps) (MainPage);
