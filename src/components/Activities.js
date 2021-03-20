import React, { useState , useEffect } from 'react';
import {Link} from 'react-router-dom';
import Dropdown from 'react-dropdown';
import EditActivity from './EditActivity';

const URL = 'https://peaceful-sands-84811.herokuapp.com/api/'

const Activities = (props) => { 
    const [activities, setActivities] = useState([]);
    const [activity, setActivity] = useState('')
    // const [id, setId] = useState('');
    const { token,  selectedActivity, setSelectedActivity, setActivityName, activityName, description, setDescription, setId, Id } = props; 
    
    const fetchActivity = async () => {
        const response = await fetch(`${URL}activities`, {
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

    const setActivityToEdit = (activityName, description, id) => { 
        console.log('activityName', activityName)
        console.log('description', description)
        console.log('id', id)


        setActivityName(activityName)
        setDescription(description)
        setId(id)
        console.log('THIS IS THE ID WITHIN ACTIVITIES',id)
        }
    useEffect(() => {
        fetchActivity();
    },[]); 

    return <>
    <div className="main-content"> 
        <div className="inner"> 
        <h2> EXISITING ACTIVIITES TO ADD TO A ROUTINE </h2>
        {   
            activities.map((activity, idx, index) => { 
                const { id, name, description } = activity
                return <>
                <h4 key={idx}> {name}</h4> 
                <p key={index}> {description} </p> 

                <Link to='/editactivity'><button onClick={(() => {setActivityToEdit(activityName, description)})} >EDIT ACTIVITY</button></Link>
                </>          
                })
        }
        </div>
        </div>
        
    </>;
}

export default Activities; 