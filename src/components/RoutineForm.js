import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';

const URL = 'http://localhost:3000/api/'

const RoutineForm = ({token, name, setName, goal, setGoal, isPublic, setIsPublic, getRoutines}) => {

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
        await getRoutines()
        //maybe set some kind of message here with state
        setName('');
        setGoal('');
        setIsPublic(false);
    }

    if (token) {
    return (<div className='routine-form'>
         <div className="main-content"> 
        <div className="inner"> 
        <h3>CREATE A NEW ROUTINE</h3>
        <form onSubmit={handleSubmit}>
            <div>
                <div>Routine Name</div>
                <input required type='text' value={name} onChange={event => setName(event.target.value)} ></input>
            </div>
            <div>
                <div>Goal</div>
                <div><input required value={goal} onChange={event => setGoal(event.target.value)} ></input></div>
            </div> <br/>
            <div>
                <div className="public">Make this routine public? <input className='routine-form-checkbox' type='checkbox' checked={isPublic} value={isPublic} onChange={event => {setIsPublic(!isPublic)}} ></input></div>
            </div>
            <button type='submit'>ADD NEW ROUTINE</button>
        </form>
        </div>
        </div>
    </div>) } else {
        return <Redirect to='/' />
    }
}

export default RoutineForm;