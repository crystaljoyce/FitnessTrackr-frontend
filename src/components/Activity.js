import React, { useState , useEffect } from 'react';
import Dropdown from 'react-dropdown';

const BASE_URL = 'http://localhost:3000/api'

const Activity = ({props}) => { 
    const { token, activities, setActivities } = props; 

    const fetchActivity = async () => {
        const response = await fetch(`${BASE_URL}/activities`, {
            method: 'GET',
            headers: {
            'Content-Type': 'Application/json',
            'Authorizaiton': `Bearer ${token}` 
            },
        });
        const data = await response.json(); 
        console.log('activity data: ',data)
        setActivities(data)
    }

    useEffect(() => {
        fetchActivity();
        console.log(activities)
    },[]); 
    
    const options = activities.map((activity, index) => { 
        return activity.name 
    })
    const defaultOption = options[0]
    return <>
    { <div className="activityDropdown">
        <Dropdown options={options} value={defaultOption} placeholder="Select an activity"/>
        </div>
        }

    </>;
}

export default Activity; 