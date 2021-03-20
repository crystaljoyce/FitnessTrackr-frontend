import React, { useState , useEffect } from 'react';
import {Link} from 'react-router-dom';
import Dropdown from 'react-dropdown';
import EditActivity from './EditActivity';

const BASE_URL = 'http://localhost:3000/api/'

const Activities = (props) => { 
    // const { token, activities, setActivities } = props; 
    const [activities, setActivities] = useState([]);
    const { token, selectedActivity, setSelectedActivity, setActivityName, activityName, description, setDescription } = props; 
    
    const fetchActivity = async () => {
        const response = await fetch('http://localhost:3000/api/activities', {
            method: 'GET',
            headers: {
            'Content-Type': 'Application/json',
            'Authorizaiton': `Bearer ${token}` 
            },
        });
        const data = await response.json(); 
        setActivities(data)
        console.log('ACTIVITIES DATA', data)
    }

    const handleSelect = (event) => {
        setSelectedActivity(event.value)
    }

    const handleActivityEdit = async () => { 
        const fetch = async () => { 
            const editResponse = await fetch('http://localhost:3000/api/activities', {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'Application/json',
                    'Authorization': `Bearer ${token}`
                }, 
                body: { 
                    name,
                    description
                }, 
            }); 
            const editData = await response.json(); 
            setActivityName('')
            setDescription('')
        }
    }

    useEffect(() => {
        fetchActivity();
    },[]); 

    return <>
    <div className="main-content"> 
        <div className="inner"> 
        <h2> EXISITING ACTIVIITES TO ADD TO A ROUTINE </h2>
        {   
            activities.map((activity, index) => { 
                return <>
                <h4 key={index}> {activity.name}</h4> 
                <p> {activity.description} </p>                
                <Link to='/editactivity'><button onClick={handleActivityEdit} >EDIT ACTIVITY</button></Link>
                </>          
                })
        }
        </div>
        </div>
        
    </>;
}

export default Activities; 