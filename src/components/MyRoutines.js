import React, {useState, useEffect} from 'react';
import {Redirect, Link} from 'react-router-dom';

const URL = 'http://localhost:3000/api/'

import RoutineForm from './RoutineForm';

const MyRoutines = ({token, user, setRoutine, name, setName, goal, setGoal, isPublic, setIsPublic}) => {
    const [myRoutines, setMyRoutines] = useState([]);

    const getRoutines = async () => {
        const response = await fetch(`${URL}users/${user.username}/routines`, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setMyRoutines(data);
    }

    useEffect(async () => {
        await getRoutines();
    }, []);

    if (token) {
        return (<div className='my-routines'>
            <div className="main-content"> 
        <div className="inner"> 
            <h2>MY ROUTINES</h2>

            <RoutineForm token={token} name={name} setName={setName} goal={goal} setGoal={setGoal} isPublic={isPublic} setIsPublic={setIsPublic} getRoutines={getRoutines} />

            {myRoutines.map(routine => {
                const {id, name, goal, isPublic, activities} = routine;

                return (<div className='routine' key={id}>
                    <div className="main-content"> 
                    <div className="inner-inner"> 
                    <h3>{name.toUpperCase()}</h3>
                    <p>{goal}</p>
                    <div>Public? <input type='checkbox' checked={isPublic} readOnly></input></div> <hr/> 
                    <h4 className="activities-list">ACTIVITIES</h4>
                    {activities.map(activity => {
                        const {activityId, count, duration, name, description} = activity;

                        return <div className='activity' key={activityId}>
                            <h5>{name.toUpperCase()}</h5>
                            <p>{description}</p>
                            <p>Count: {count}</p>
                            <p>Duration: {duration}</p>
                        </div>
                    })}
                    
                    <Link to='/viewroutine'><button onClick={() => setRoutine(routine)}>VIEW ROUTINE</button></Link>
                </div> 
                </div> 
                </div>)

            })}
            </div>
            </div> 
        </div>)
    } else {
        return <Redirect to='/' />
    }
}

export default MyRoutines;