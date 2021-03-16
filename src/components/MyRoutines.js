import React, {useState, useEffect} from 'react';
import {Redirect, Link} from 'react-router-dom';

const URL = 'http://localhost:3000/api/'

import RoutineForm from './RoutineForm';

//show list of routines -- need to update list once you click add new routine

const MyRoutines = ({token, user, setRoutine, name, setName, goal, setGoal, isPublic, setIsPublic}) => {
    const [myRoutines, setMyRoutines] = useState([]);

    useEffect(async () => {
        const response = await fetch(`${URL}users/${user.username}/routines`, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json'
            }
        });
        const data = await response.json();
        setMyRoutines(data);
    }, []);

    if (token) {
        return (<div className='my-routines'>
            <h2>MY ROUTINES</h2>

            <RoutineForm token={token} name={name} setName={setName} goal={goal} setGoal={setGoal} isPublic={isPublic} setIsPublic={setIsPublic} />

            {myRoutines.map(routine => {
                const {id, name, goal, isPublic, activities} = routine;

                return (<div className='routine' key={id}>
                    <h3>{name.toUpperCase()}</h3>
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
                    <Link to='/modifyroutine'><button onClick={() => setRoutine(routine)}>MODIFY ROUTINE</button></Link>
                </div>)
            })}
        </div>)
    } else {
        return <Redirect to='/' />
    }
}

export default MyRoutines;