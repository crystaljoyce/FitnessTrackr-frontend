import React from 'react';
import {Link} from 'react-router-dom';

const RoutineActivities = ({routine, setActivity}) => {

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