import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux';
import { editProject, viewProject } from '../actions/mainPage'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '90%',
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(6),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
      margin: theme.spacing(1)
  }, 
  chip: {
    margin: theme.spacing(1),
  },
  desc: {
    display: 'block',
    maxWidth: 700, //Todo: Needs to change
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }
}));



function Project(props) {
  const classes = useStyles();
  const projName = props.name;
  const projDept = props.dept;
  const projDesc = props.desc;
  const viewProject = props.viewProject;
  const editProject = props.editProject;

  function handleViewProject(){
    viewProject();
    //console.log(props.id)
  }

  function handleEditProject(){
    editProject();
    //console.log(props.id)
  }

  return (
    <List className={classes.root}>
        <Paper>
      <ListItem alignItems="flex-start"> 
        <ListItemText primary={projName} secondary={
            <React.Fragment>
              <Typography
                component="div"
                variant="body2"
                className={classes.desc}
              >
                { projDesc } 
              </Typography>
              <DeptChips value={ projDept } />
            </React.Fragment>} />
        <ListItemSecondaryAction>
        <Tooltip placement="top" title="View">
            <IconButton edge="end" aria-label="search" onClick={handleViewProject} className={classes.icon}>
                <SearchIcon />
            </IconButton>
        </Tooltip>
        <Tooltip placement="top" title="Edit">
            <IconButton edge="end" aria-label="edit" onClick={handleEditProject} className={classes.icon}>
                <EditIcon />
            </IconButton>
        </Tooltip>
        <Tooltip placement="top" title="Delete">
            <IconButton edge="end" aria-label="delete" className={classes.icon}>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
      </Paper>
    </List>
  );
}

function DeptChips(props) {
    var dept= []
    const classes=useStyles();
    for(var i=0;i<props.value.length;i++){
        dept.push(<Chip key={i} variant="outlined" color="secondary" size="small" label={ props.value[i] } className={classes.chip}/>);
    }

    return(
        <div>
            {dept}
        </div>
    )
}

const mapDispatchToProps = ({
  editProject: editProject, viewProject: viewProject
})

export default connect(null, mapDispatchToProps) (Project);