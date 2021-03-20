import React, { useState , useEffect } from 'react';
import Dropdown from 'react-dropdown';

const BASE_URL = 'http://localhost:3000/api/'

const Activities = (props) => { 
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

    // const onOptionClicked = value => () => {
    //     setSelectedOption(value);
    //     setIsOpen(false);
    //   };

    return <>
    <div className="main-content"> 
        <div className="inner"> 
    { 
    <div className="activityDropdown">
        <div className="field-label"> <b>SELECT AN EXISTING ACTIVITIES FROM THE DROPDOWN LIST: <br/> </b> </div> <br/> 
        <Dropdown 
            options={options} 
            value={defaultOption} 
            onChange={handleSelect} 
            // onClick={onOptionClicked(options)} key={Math.random()}
            />
            <br/> 
            <button type='submit' > EDIT ACTIVITY</button>
        </div>
        }
        </div>
        </div>
    </>;
}

export default Activities; 