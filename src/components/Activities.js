import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const URL = 'http://localhost:3000/api/'

const Activities = (props) => {
    const [activitiesList, setActivitiesList] = useState([]); 

    const { token, setActivityListId, setActivityName, setDescription }= props; 

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
   
    return (<div className='activities' >
        {activitiesList.map((activityCJ, index) => {
            const {id, name, description} = activityCJ;

            return <div key={index + 200} className="main-content"> 
            <div key={index + 300}className="inner-inner"> 
            <div key={index + 400}className='activities' >
                <h3 key={index + 500}>{name.toUpperCase()}</h3>
                <hr></hr>
                <div key={index + 600} className='view-activities' >
                    <h5 key={index +1000}>{name}</h5>
                    <p key={index +10000}>{description}</p>
                    <Link to='/editactivity' key={index + 100}><button 
                    >EDIT ACTIVITY</button></Link>
                        </div> 
                </div>
                <br />
            </div>
            </div>}
     ) }</div>)
        
    
}

export default Activities;