import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';

const URL = 'http://localhost:3000/api/'

import RoutineForm from './RoutineForm';

//create new routine
//edit routine
//delete routine
//show list of routines

const MyRoutines = ({token, user}) => {
    const [myRoutines, setMyRoutines] = useState([]);
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    useEffect(async () => {
        const response = await fetch(`${URL}users/${user.username}/routines`, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json'
            }
        });
        const data = await response.json();
        setMyRoutines(data);
    }, [])

    console.log('myRoutines: ', myRoutines)

    if (token) {
        
        return (<div className='my-routines'>
            <h2>MY ROUTINES</h2>

            <RoutineForm token={token} name={name} setName={setName} goal={goal} setGoal={setGoal} isPublic={isPublic} setIsPublic={setIsPublic} />

            {myRoutines.map(routine => {
                const {id, name, goal, isPublic, activities} = routine;

                return (<div className='routine' key={id}>
                    <h3>{name.toUpperCase()}</h3>
                    <div className='view-routine'>
                        <p>{goal}</p>
                        <h4>ACTIVITIES</h4>
                        {activities.map(activity => {
                            const {activityId, count, duration, name, description} = activity;

                            return <div className='activity' key={activityId}>
                                <h5>{name.toUpperCase()}</h5>
                                <p>{description}</p>
                                <p>Count: {count}</p>
                                <p>Duration: {duration}</p>
                            </div>
                        })}
                        <button>EDIT</button>
                        <button>DELETE</button>
                    </div>
                </div>)
            })}
        </div>)
    } else {
        return <Redirect to='/' />
    }
}

export default MyRoutines;