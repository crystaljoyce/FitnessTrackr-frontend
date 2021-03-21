import React, {useState} from 'react';
import {Link} from 'react-router-dom';

//when you post to routines with an activity, you are able to get a routine activity id back look at POST /routine/:routineId/activities return parameters
//you can only get the routine activity Id if you post to routines with the routineId/activities

const URL = 'http://localhost:3000/api/'

const RoutineActivities = ({routine, activity, setActivity}) => {

    return (<div className='routine-activity'>
        <div className="main-content"> 
        <div className="inner"> 

        <h3>ACTIVITIES</h3>
            {routine.activities.map(activity => {
                const {name, description, id, count, duration} = activity;
                <hr> </hr>
                return <div className='activity' key={id}>
                    <h5>{name.toUpperCase()}</h5>
                    <p>{description}</p>
                    <p>Count: {count} minutes</p>
                    <p>Duration: {duration} reps</p>
                    
                    <Link to='/viewroutineactivity'><button className='routinebutton' onClick={() => setActivity(activity)}>VIEW ACTIVITY</button></Link>
                </div>
            })}
        </div>
        </div> 
    </div>)
}

export default RoutineActivities;