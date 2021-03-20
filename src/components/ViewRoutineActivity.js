import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';

const URL = 'http://localhost:3000/api/'

const ViewRoutineActivity = ({token, activity, setActivity, setCount, setDuration}) => {
    const [deleteRoutineActivityMessage, setDeleteRoutineActivityMessage] = useState('');
    const {id, name, description, routineActivityId, count, duration} = activity;

    const handleDelete = async (event) => {
        event.preventDefault();

        const response = await fetch(`${URL}routine_activities/${routineActivityId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setDeleteRoutineActivityMessage(data ? <div>This activity has been deleted</div> : '');
    }

    const handleClick = () => {
        setCount(count);
        setDuration(duration);
    }

    if (token && !deleteRoutineActivityMessage) {
        return (
            <div className="main-content"> 
            <div className="inner"> 
            <div className='activity' key={id}>
            <h5>{name.toUpperCase()}</h5>
            <p>{description}</p>
            <p>Count: {count} minutes</p>
            <p>Duration: {duration} reps</p>
            <Link to='/editroutineactivity'><button onClick={handleClick} >EDIT</button></Link>
            <button id='danger-button' onClick={handleDelete}>DELETE</button>
    </div>
    </div> 
    </div> 
    )
    } else if (token && deleteRoutineActivityMessage) {
        return deleteRoutineActivityMessage;
    } else {
        return <Redirect to='/' />
    }
}

export default ViewRoutineActivity;