import React from 'react';
import WorkoutList from '../workout/WorkoutList';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {list} from './api-routine'
import auth from './../auth/auth-helper'
import RoutineListItem from './RoutineListItem';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { connect } from 'react-redux'
import {requestRoutines} from '../../redux/actions/routines'

const styles = theme => ({
    cardGrid: {
        padding: `${theme.spacing.unit * 3}px 0`,
      },
    workoutsContainer: {
        display: 'flex',
        justifyContent: 'center',
      },
      layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
      },
      justify:{
        justifyContent: 'center'
      },
      buttonContainer:{
          display:'flex',
          justifyContent: 'center',
          marginBottom: '10px'
      },
      button:{
          backgroundColor:theme.palette.primary.main, 
          color:'white',
      },

  });
const mapStateToProps = state => {
    return {
        routines: state.routines.data,
        SelectedRoutine : state.routines.SelectedRoutine
    }
}

class RoutineList extends React.Component {
    state = {
        editRoutine:null,
        error:'',
        isNew: false
    }
    handleAddClick = () =>{
        this.setState({editRoutine: [], isNew : true});
    }
    handleReturnClick = () =>{
        this.setState({editRoutine: null});
        this.fetchRoutines();
    }
    fetchRoutines = () =>{
        const jwt = auth.isAuthenticated()
        this.props.dispatch(requestRoutines(jwt.user._id,jwt.token));
    }
    componentDidMount = () =>{
        this.fetchRoutines();
    }
    render() {
        const {classes, routines} = this.props
        return (
            <div>
                {!this.props.SelectedRoutine && 
                    <div>
                        <div className={classNames(classes.layout, classes.cardGrid)}>
                            <Grid container spacing={40} className={classes.justify}>
                                {this.props.routines.map(routine => (
                                    <RoutineListItem
                                        key = {routine._id}
                                        routine = {routine}
                                        handleReturn = {this.handleReturnClick}/>
                                ))}
                            </Grid>
                        </div>
                        <div className={classes.buttonContainer}>
                            <Button variant="contained" 
                                    className={classes.button}>
                                Add Routine
                            </Button>
                        </div>
                    </div>
                    
                }
                
                {this.props.SelectedRoutine 
                    && <WorkoutList 
                            handleReturn = {this.handleReturnClick}
                            isNew = {this.state.isNew}
                        />
                }
            </div>
        );
    }
}
export default connect(mapStateToProps)(withStyles(styles)(RoutineList))