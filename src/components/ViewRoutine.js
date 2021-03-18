import React from 'react';
import {Link, Redirect} from 'react-router-dom';

const URL = 'http://localhost:3000/api/'

import RoutineActivityForm from './RoutineActivityForm';

//do something so the user knows their routine has been deleted

const ViewRoutine = ({token, routine, setRoutine, setName, setGoal, setIsPublic, activities, setActivities}) => {
    const {id, name, goal, isPublic} = routine;

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
    }

    const handleClick = () => {
        setName(name);
        setGoal(goal);
        setIsPublic(isPublic);
    }

    if (token) {

        return (<div className='routine' key={id}>
            <div className="main-content"> 
        <div className="inner"> 
            <h3>{name.toUpperCase()}</h3>
            <p>{goal}</p>
            <div>Public? <input type='checkbox' checked={isPublic} readOnly></input></div>
            <Link to='/editroutine'><button onClick={handleClick}>EDIT</button></Link>
            <button id='danger-button' onClick={handleDelete}>DELETE</button>

            <RoutineActivityForm activities={activities} setActivities={setActivities} setRoutine={setRoutine} routine={routine} />
        </div>
        </div>
        </div>)
    } else {
        return <Redirect to='/' />
    }
}

export default ViewRoutine;