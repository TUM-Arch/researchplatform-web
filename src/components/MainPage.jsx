import React from 'react';
import Header from './Header';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        position: 'relative',
      },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    paper: {
        color: theme.palette.text.secondary,
        height: 1000
    },
    projectTitle: {
        textDecoration: 'underline'
    },
    timeTitle: {
        padding: theme.spacing(6, 1, 1, 7),
        textAlign: 'left',
        textDecoration: 'underline'
    }
}));

function MainPage() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }
    return (
            <div>
                <Header />
                <div className={classes.root}>
                <Box display="flex" flexDirection="row" p={0} m={2} bgcolor="background.paper">
                    <Box p={0} m={2} flexGrow={2}>    
                        <Paper className={classes.paper}>
                            <Box display="flex" flexDirection="row" justifyContent="space-between" p={5} bgcolor="background.paper">
                                <Typography variant="h4" color="secondary" className={classes.projectTitle}>
                                Research Projects
                                </Typography>
                                <Button  onClick={handleClickOpen} variant="contained" color="secondary">
                                    Create Project
                                </Button>
                                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">New Project</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>
                                        To craete a new project, please enter your all the project details here.
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Project Name"
                                        type="text"
                                        fullWidth
                                    />
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleClose} color="primary">
                                        Subscribe
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </Box>
                        </Paper>
                    </Box>
                    <Box p={0} m={2} flexGrow={1}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" className={classes.timeTitle} color="secondary">
                                Time
                            </Typography>
                        </Paper>
                    </Box>
                </Box>
                </div>
            </div>
    );
}

export default MainPage;
