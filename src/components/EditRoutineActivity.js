import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

const URL = 'https://fitnesstrac-kr.herokuapp.com/api/';

const EditRoutineActivity = ({token, activity, count, setCount, duration, setDuration}) => {
    const {name, description, routineActivityId} = activity;
    const [editMessage, setEditMessage] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`${URL}routine_activities/${routineActivityId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                count,
                duration
            })
        });
        const data = await response.json();
        setCount(0);
        setDuration(0);
        setEditMessage(data ? <div className="main-content" > <div className="inner"> The activity has been updated</div></div> : '');
    }

    if (token && !editMessage) {
        return (<div className="main-content"> 
            <div className="inner"> 
            <div className='edit-activity'>
            <h3>EDIT ACTIVITY</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <h4>{name.toUpperCase()}</h4>
                </div>
                <div>
                    <div>{description}</div>
                </div>
                <div>
                    <div>Count</div>
                    <input required type='number' min='0' value={count} onChange={event => setCount(event.target.value)} ></input>
                </div>
                <div>
                    <div>Duration</div>
                    <input required type='number' min='0' value={duration} onChange={event => setDuration(event.target.value)} ></input>
                </div>
                <button type='submit'>EDIT ACTIVITY</button>
            </form>
        </div>
        </div> 
        </div> )
    } else if (token && editMessage) {
        return editMessage;
    } else {
        return <Redirect to='/' />
    }

}

export default EditRoutineActivity;