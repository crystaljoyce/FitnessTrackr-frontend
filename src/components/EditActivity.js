import React, {useState} from 'react';
import {Redirect, useHistory} from 'react-router-dom';

const URL = 'http://localhost:3000/api/'

const EditActivity = (props) => {
    const { token, activity, setId, setActivityName, setDescription, activities } = props; 
    const { id, activityName, description } = activity; 
    const history = useHistory();

    const handleActivityEdit = async (event) => {
        event.preventDefault();

        const response = await fetch(`${URL}activities/${id}`, {
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
        history.push('/activities');
    }
    if (token) {
        return (<div className='edit-activity'>
            <div className="main-content"> 
            <div className="inner"> 
            <h3>EDIT ACTIVITY</h3>
            <form onSubmit={handleActivityEdit}>
                <div>
                    <div>Activity Name</div>
                    <input required type='text' value={activityName} onChange={event => setActivityName(event.target.value)} ></input>
                </div>
                <div>
                    <div>Description</div>
                    <input required type='text' value={description} onChange={event => setDescription(event.target.value)} ></input>

                </div>
                <button type='submit' >EDIT ACTIVITY</button>
            </form>
            </div> 
            </div> 
        </div>)
    } else {
        return <Redirect to='/activities' />
    }
}

export default EditActivity;