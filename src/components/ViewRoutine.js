import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';

const URL = 'http://localhost:3000/api/'

import RoutineActivityForm from './RoutineActivityForm';

const ViewRoutine = ({token, routine, setRoutine, setName, setGoal, setIsPublic, activities, setActivities}) => {
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
            <h3>{name.toUpperCase()}</h3>
            <p>{goal}</p>
            <div>Public? <input type='checkbox' checked={isPublic} readOnly></input></div>

            {routineActivities.map(routineActivity => {
                const {activityId, id, count, duration, name, description} = routineActivity;

                return (<div className='activity' key={id}>
                    <h5>{name.toUpperCase()}</h5>
                    <p>{description}</p>
                    <p>Count: {count} minutes</p>
                    <p>Duration: {duration} reps</p>
                </div>)
            })}

            <Link to='/editroutine'><button onClick={handleClick}>EDIT</button></Link>
            <button id='danger-button' onClick={handleDelete}>DELETE</button>

            <RoutineActivityForm token={token} activities={activities} setActivities={setActivities} setRoutine={setRoutine} routine={routine} routineActivityId={routineActivityId} setRoutineActivityId={setRoutineActivityId} />
        </div>)
    } else if (token && deleteMessage) {
        return deleteMessage;
    } else {
        return <Redirect to='/' />
    }
}

export default ViewRoutine;