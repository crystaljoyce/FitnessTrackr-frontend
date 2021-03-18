import React, { useState , useEffect } from 'react';
import Dropdown from 'react-dropdown';

const BASE_URL = 'http://localhost:3000/api/'

const Activity = (props) => { 
    // const { token, activities, setActivities } = props; 
    const [ activities, setActivities ] = useState([]);

    const { token, selectedActivity, setSelectedActivity } = props; 
    console.log(token)
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
    }

    const handleSelect = (event) => {
        setSelectedActivity(event.value)
    }

    useEffect(() => {
        fetchActivity();
    },[]); 

    const options = activities.map((activity, index) => { 
        return {
            value: activity.id,
            label: activity.name
        }
    })
    const defaultOption = options[0]
    console.log('defaultOption: ', defaultOption)
    return <>
    { <div className="activityDropdown">
        <Dropdown options={options} value={defaultOption} onChange={handleSelect} placeholder="Select an activity"/>
        </div>
        }

    </>;
}

export default Activity; 