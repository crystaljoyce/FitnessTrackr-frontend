import React from 'react';
import {Link, Redirect} from 'react-router-dom';

const URL = 'http://localhost:3000/api/'

//do something so the user knows their routine has been deleted
//edit routine

const ViewRoutine = ({token, routine, setName, setGoal, setIsPublic}) => {
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
    };

    const handleClick = () => {
        setName(name);
        setGoal(goal);
        setIsPublic(isPublic);
    }

    if (token) {

        return (<div className='routine' key={id}>
            <h3>{name.toUpperCase()}</h3>
            <p>{goal}</p>
            <div>Public? <input type='checkbox' checked={isPublic} readOnly></input></div>
            <Link to='editroutine'><button onClick={handleClick}>EDIT</button></Link>
            <button id='danger-button' onClick={handleDelete}>DELETE</button>
        </div>)
    } else {
        return <Redirect to='/' />
    }
}

export default ViewRoutine;