import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';

const URL = 'http://localhost:3000/api/'

const RoutineForm = ({token, name, setName, goal, setGoal, isPublic, setIsPublic}) => {

    useEffect(() => {
        setName('');
        setGoal('');
        setIsPublic(false);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`${URL}routines`, {
            method: 'POST',
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
        console.log('routineformdata: ', data)
        //maybe set some kind of message here with state
        setName('');
        setGoal('');
        setIsPublic(false);
    }

    console.log('NICE')

    return (<div className='routine-form'>
        <h3>CREATE A NEW ROUTINE</h3>
        <form onSubmit={handleSubmit}>
            <div>
                <div>Routine Name</div>
                <input required type='text' value={name} onChange={event => setName(event.target.value)} ></input>
            </div>
            <div>
                <div>Goal</div>
                <div><textarea required value={goal} onChange={event => setGoal(event.target.value)} ></textarea></div>
            </div>
            <div>
                <div>Public? <input className='routine-form-checkbox' type='checkbox' value={isPublic} onChange={event => setIsPublic(!isPublic)} ></input></div>
            </div>
            <button type='submit'>ADD NEW ROUTINE</button>
        </form>
    </div>)
}

export default RoutineForm;