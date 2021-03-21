import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';

const URL = 'https://fitnesstrac-kr.herokuapp.com/api/'

import RoutineActivityForm from './RoutineActivityForm';

const ViewRoutine = ({token, routine, setRoutine, setName, setGoal, setIsPublic, activities, setActivities, setActivityListId, setActivityName, setDescription}) => {
    const [routineActivityId, setRoutineActivityId] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState('');
    const {id, name, goal, isPublic, activities : routineActivities} = routine;

    const handleDelete = async (event) => {
        event.preventDefault();

        const response = await fetch(`${URL}routines/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setDeleteMessage(data ? <div>This routine has been deleted</div> : '')
    }

    const handleClick = () => {
        setName(name);
        setGoal(goal);
        setIsPublic(isPublic);
    }

    if (token && !deleteMessage) {

        return (<div className='routine' key={id}>
            <div className="main-content"> 
            <div className="inner"> 
            <h3>{name.toUpperCase()}</h3>
            <hr></hr>
            <p>{goal}</p>
            <div>Public? <input className="checkbox" type='checkbox' checked={isPublic} readOnly></input></div>

            {routineActivities.map(routineActivity => {
                const {id, count, duration, name, description} = routineActivity;

                return (<div className='activity' key={id}>
                    <h5>{name.toUpperCase()}</h5>
                    <p>{description}</p>
                    <p>Count: {count} minutes</p>
                    <p>Duration: {duration} reps</p>
                </div>)
            })}

            <Link to='/editroutine'><button onClick={handleClick}>EDIT</button></Link>
            <button id='danger-button' onClick={handleDelete}>DELETE</button>

            <RoutineActivityForm routine={routine} setActivityListId={setActivityListId} setActivityName={setActivityName} setDescription={setDescription} activityName={activityName} />
        </div> 
        </div> 
        </div>)
    } else if (token && deleteMessage) {
        return deleteMessage;
    } else {
        return <Redirect to='/' />
    }
}

export default ViewRoutine;