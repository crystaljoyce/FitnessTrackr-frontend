import React, {useState, useEffect} from 'react';
import Dropdown from 'react-dropdown';
import Activities from './Activities';
import AddActivityToRoutine from './AddActivityToRoutine';
const URL = 'http://localhost:3000/api/'

const RoutineActivityForm = ({activities, setActivities, setRoutine, routine, routineActivityId, setRoutineActivityId, setActivityListId, description, setDescription, activityName, setActivityName}) => {
    // const [activityName, setActivityName] = useState('');
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
    console.log('activities in RA form ', activities)
    console.log('activities in RA form ', activityName)
    console.log('activities in RA form ', description)


    // const options = activities.map((activity, index) => { 
    //     return {
    //         value: activity.id,
    //         label: activity.name
    //     }
    // })
    return (<div className='routine-activity-form'>
        {/* <h3>ADD AN ACTIVITY</h3> */}
        <form onSubmit={handleSubmit}>
            <AddActivityToRoutine value={activityName} selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} setActivityListId={setActivityListId} setActivityName={setActivityName} setDescription={setDescription} onChange={event => setActivityName(event.default)} />
            {/* <div>
                <div>Activities to Add</div>
                <Dropdown
                    options={options}
                    placeholder='select an activity'
                />
                <input required type='text' value={activityName} onChange={event => setCount(event.target.value)} ></input>
            </div> */}
            <div>
                <div>Count</div>
                <input required type='number' value={count} onChange={event => setCount(event.target.value)} ></input>
            </div>
            <div>
                <div>Duration</div>
                <input required type='number' value={duration} onChange={event => setDuration(event.target.value)} ></input>
            </div>
            <button type='submit'>ADD ACTIVITY</button>
        </form>
    </div>)
}

export default RoutineActivityForm;