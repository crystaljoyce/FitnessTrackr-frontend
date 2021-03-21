import React, {useState, useEffect} from 'react';
import Dropdown from 'react-dropdown';


const URL = 'http://localhost:3000/api/'

const AddActivityToRoutine = ({token,  activityListId, activityName, setActivityName, description, setDescription, setSelectedActivity}) => {
    const [activities, setActivities] = useState([]);
    
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

    return <>
    <div className="main-content"> 
        <div className="inner"> 
    { 
    <div id="activityDropdown">
        <div className="field-label"> <b>SELECT AN EXISTING ACTIVITY FROM THE DROPDOWN LIST: <br/> </b> </div> <br/> 
        <Dropdown 
            options={options}
            selected={options} 
            onChange={handleSelect} 
            placeholder={'Select an activity'}
            />
            <br/> 
        </div>
        }
        </div>
        </div>
    </>;
}

export default AddActivityToRoutine;