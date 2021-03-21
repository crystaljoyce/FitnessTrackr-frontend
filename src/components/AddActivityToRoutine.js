import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import Dropdown from 'react-dropdown';


const URL = 'http://localhost:3000/api/'

import RoutineActivities from './RoutineActivities';

//deploy back end code to heroku

const AddActivityToRoutine = ({token,  activityListId, activityName, setActivityName, description, setDescription, setSelectedActivity}) => {
    const [activities, setActivities] = useState([]);
    // const { id } = activity; 
    console.log('edit activity ID: ', activityListId)
    console.log('edit activity name: ', activityName)
    console.log('edit activity description: ', description)
    
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

    // const onOptionClicked = value => () => {
    //     setSelectedOption(value);
    //     setSelectedActivity(value)

    //   };

    return <>
    <div className="main-content"> 
        <div className="inner"> 
    { 
    <div className="activityDropdown">
        <div className="field-label"> <b>SELECT AN EXISTING ACTIVIT FROM THE DROPDOWN LIST: <br/> </b> </div> <br/> 
        <Dropdown 
            options={options} 
            value={defaultOption} 
            onChange={handleSelect} 
            // onClick={onOptionClicked(options)} key={Math.random()}
            />
            <br/> 
        </div>
        }
        </div>
        </div>
    </>;
}

export default AddActivityToRoutine;