import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const URL = 'http://localhost:3000/api/'

const Routines = () => {
    const [routineList, setRoutineList] = useState([]);

    useEffect(async () => {
        const response = await fetch(`${URL}routines`, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json'
            }
        });
        const data = await response.json();
        setRoutineList(data);
    }, [])
    
    return (<div className='routines'>
        {routineList.map(routine => {
            const {id, name, creatorName, goal, activities} = routine;

            return <div className="main-content"> 
            <div className="inner-inner"> 
            <div className='routine' key={id}>
                <h3>{name.toUpperCase()}</h3>
                <div className='view-routine'>
                    <p>{goal}</p>
                    <p>Created by: {creatorName} </p> 
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
                </div>
                <br />
            </div>
            </div>
                        </div>
        })}
    </div>)
}

export default Routines;