import React, {useState, useEffect} from 'react';
import AddActivityToRoutine from './AddActivityToRoutine';

const URL = 'https://fittrackr-backend.herokuapp.com/api/'

const RoutineActivityForm = ({routine, setActivityListId, setDescription, activityName, setActivityName}) => {
    const [count, setCount] = useState(0);
    const [duration, setDuration] = useState(0);
    const [selectedActivity, setSelectedActivity] = useState(0);
    const {id} = routine;

    useEffect(() => {
        setCount(0);
        setDuration(0);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`${URL}routines/${id}/activities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                activityId: selectedActivity,
                count,
                duration
            })
        });
        const data = await response.json();
    }
  
    return (<div className='routine-activity-form'>
        <form onSubmit={handleSubmit}>
            <AddActivityToRoutine value={activityName} selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} setActivityListId={setActivityListId} setActivityName={setActivityName} setDescription={setDescription} onChange={event => setActivityName(event.default)} />
            <div>
                <div>Minutes</div>
                <input required type='number' min='0' value={count} onChange={event => setCount(event.target.value)} ></input>
            </div>
            <div>
                <div>Reps</div>
                <input required type='number' min='0' value={duration} onChange={event => setDuration(event.target.value)} ></input>
            </div>
            <button type='submit'>ADD ACTIVITY</button>
        </form>
    </div>)
}

export default RoutineActivityForm;
