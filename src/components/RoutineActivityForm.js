import React, {useState, useEffect} from 'react';
import AddActivityToRoutine from './AddActivityToRoutine';
const URL = 'http://localhost:3000/api/'

const RoutineActivityForm = ({activities, setActivities, setRoutine, routine, routineActivityId, setRoutineActivityId, setActivityListId, description, setDescription, activityName, setActivityName}) => {
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
            <Activities value={activityName} selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} onChange={event => setActivityName(event.default)} />
            <div>
                <div>Minutes</div>
                <input required type='number' value={count} onChange={event => setCount(event.target.value)} ></input>
            </div>
            <div>
                <div>Reps</div>
                <input required type='number' value={duration} onChange={event => setDuration(event.target.value)} ></input>
            </div>
            <button type='submit'>ADD ACTIVITY</button>
        </form>
    </div>)
}

export default RoutineActivityForm;