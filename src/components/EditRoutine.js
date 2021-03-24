import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

const URL = 'https://fittrackr-backend.herokuapp.com/api/'

import RoutineActivities from './RoutineActivities';

const EditRoutine = ({token, routine, name, setName, goal, setGoal, isPublic, setIsPublic, activity, setActivity}) => {
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`${URL}routines/${routine.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify({
                name,
                goal,
                isPublic
            })
        });
        const data = await response.json();
        setName('');
        setGoal('');
        setIsPublic(false);
    }

    if (token) {

        return (<div className='routine-form'>
            <div className="main-content"> 
            <div className="inner-inner"> 
            <h3>EDIT ROUTINE</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>Routine Name</div>
                    <input required type='text' value={name} onChange={event => setName(event.target.value)} ></input>
                </div>
                <div>
                    <div>Goal</div>
                    <input required type='text' value={goal} onChange={event => setGoal(event.target.value)} ></input>
                </div>
                <div>Public? <input className="checkbox" type='checkbox' checked={isPublic} value={isPublic} onChange={event => setIsPublic(!isPublic)}
                ></input> </div>
                <button type='submit'>EDIT ROUTINE</button>
            </form>
            <RoutineActivities routine={routine} setActivity={setActivity} />
        </div> 
        </div> 
        </div>)
    } else {
        return <Redirect to='/' />
    }
}

export default EditRoutine;