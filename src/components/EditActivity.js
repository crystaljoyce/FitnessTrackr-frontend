import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';


const URL = 'http://localhost:3000/api/'

import RoutineActivities from './RoutineActivities';

//deploy back end code to heroku

const EditActivity = ({token, activityListId, activityName, setActivityName, description, setDescription}) => {
    // const { id } = activity; 
    console.log('edit activity ID: ', activityListId)
    console.log('edit activity name: ', activityName)
    console.log('edit activity description: ', description)

    
    const handleSubmit = async (event) => {
        event.preventDefault();

        // console.log('activityListID in edit activity', activityListId)
        const response = await fetch(`${URL}activities/${activityListId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify({
                name: activityName,
                description
            })
        });
        const data = await response.json();
        setActivityName('');
        setDescription('');
    }

    if (token) {

        return (<div className='routine-form'>
            <div className="main-content"> 
            <div className="inner"> 
            <h3>EDIT ACTIVITY</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>Activity Name</div>
                    <input required type='text' value={activityName} onChange={event => setActivityName(event.target.value)} ></input>
                </div>
                <div>
                    <div>Description</div>
                    <input required type='text' value={description} onChange={event => setDescription(event.target.value)} ></input>
                </div>
                <button type='submit'>EDIT ACTIVITY</button>
            </form>
        </div> 
        </div> 
        </div>)
    } else {
        return <Redirect to='/home' />
    }
}

export default EditActivity;