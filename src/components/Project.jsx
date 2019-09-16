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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
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
    width: 700, //Todo: Needs to change
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }
}));

export default function Project(props) {
  const classes = useStyles();
  const projName = props.name;
  const projDept = props.dept;
  const projDesc = props.desc;

  return (
    <List className={classes.root}>
        <Paper>
      <ListItem alignItems="flex-start"> 
        <ListItemText primary={projName} secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.desc}
              >
                { projDesc } 
              </Typography>
              <DeptChips value={ projDept } />
            </React.Fragment>} />
        <ListItemSecondaryAction>
        <Tooltip placement="top" title="View">
            <IconButton edge="end" aria-label="search" className={classes.icon}>
                <SearchIcon />
            </IconButton>
        </Tooltip>
        <Tooltip placement="top" title="Edit">
            <IconButton edge="end" aria-label="edit" className={classes.icon}>
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
        dept.push(<Chip variant="outlined" color="secondary" size="small" label={ props.value[i] } className={classes.chip}/>);
    }

    return(
        <div>
            {dept}
        </div>
    )
}