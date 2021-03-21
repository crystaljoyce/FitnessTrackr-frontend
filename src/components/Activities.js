import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const URL = 'https://fitnesstrac-kr.herokuapp.com/api/'

const Activities = ({ token, setActivityListId, setActivityName, setDescription }) => {
    const [activitiesList, setActivitiesList] = useState([]);

    useEffect(async () => {
        const response = await fetch(`${URL}activities`, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json'
            }
        });
        const data = await response.json();
        setActivitiesList(data);
    }, [])

    return (<div className='activities'>
        {activitiesList.map(activityCJ => {
            const {id, name, description} = activityCJ;
            setActivityListId(id)
            setActivityName(name)
            setDescription(description)
            console.log('setting id', activityListId)
            console.log('setting name', activityName)
            console.log('setting description', description)

            return <div className="main-content"> 
            <div className="inner-inner"> 
            <div className='activities' key={id}>
                <h3>{name.toUpperCase()}</h3>
                <div className='view-activities'>
                    <h5>{name}</h5>
                    <p>{description}</p>
                    <div hidden='true'>{id} </div> 
                    { token 
                    ? <Link to='/editactivity'><button 
                    >EDIT ACTIVITY</button></Link>
                    : ''}    </div> 
                </div>
                <br />
            </div>
            </div>}
     ) }</div>)
    }

    export default Activities;