import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const URL = 'http://localhost:3000/api/'

const Routines = ({token, setRoutine}) => {
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

    console.log('routineList: ', routineList)
    
    return (<div className='routines'>
        <h2>ROUTINES</h2>
        {routineList.map(routine => {
            const {id, name, creatorName, goal} = routine;

            return <div className='routine' key={id}>
                <h3>{name.toUpperCase()}</h3>
                <div className='view-routine'>
                    <p>{goal}</p>
                    <p>Created by: {creatorName}</p>
                </div>
            </div>
        })}
    </div>)
}

export default Routines;