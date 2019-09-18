import React from 'react';
import { connect } from 'react-redux';
import en from '../translations/en.json';
import de from '../translations/de.json';
import { projectDialogClose } from '../actions/mainPage';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function CreateViewDeleteProject(props) {
    const { open, language, dialogClose, projectDialogState } = props;

    function handleClose() {
        dialogClose();
    }

    return(
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                {( () => { switch(projectDialogState) {
                    case "create": 
                        return ( language === 'en' ? ( en.createProject ) : ( de.createProject )) 
                    case "edit":
                        return (language === 'en' ? ( en.editProject ) : ( de.editProject ))
                    case "view":
                        return (language === 'en' ? ( en.viewProject ) : ( de.viewProject ))
                    default:
                        return null
                 } })()}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    { language === 'en' ? ( en.newProjectSubtitle ) : ( de.newProjectSubtitle ) } 
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label= { language === 'en' ? ( en.fieldProjectName ) : ( de.fieldProjectName ) } 
                    type="text"
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    { language === 'en' ? ( en.cancel ) : ( de.cancel ) } 
                </Button>
                <Button onClick={handleClose} color="secondary">
                    { language === 'en' ? ( en.submit ) : ( de.submit ) } 
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const mapStateToProps = ({
    mainPage: {
        projectDialogState
    }
}) => ({
    projectDialogState
});

const mapDispatchToProps = {
    dialogClose: projectDialogClose
};

export default connect(mapStateToProps, mapDispatchToProps) (CreateViewDeleteProject);

