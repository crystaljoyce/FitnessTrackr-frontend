import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const URL = 'http://localhost:3000/api/'

const Activities = (props) => {
    const [activitiesList, setActivitiesList] = useState([]);
    const { token, activityListId, setActivityListId, activityName, setActivityName, description, setDescription }= props; 

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
                    // onClick={handleActivityEdit} 
                    >EDIT ACTIVITY</button></Link>
                    : '' } 
                        </div> 
                </div>
                <br />
            </div>
            </div>}
     ) }</div>)
    }

    export default Activities;