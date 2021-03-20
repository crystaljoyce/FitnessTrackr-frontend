import React from 'react';
import {Link, Redirect} from 'react-router-dom';

const URL = 'http://localhost:3000/api/'

//do something so the user knows their routine has been deleted

const ActivityView = ({token, routine, setRoutine, setName, setGoal, setIsPublic, activities, setActivities}) => {
    const {id, name, goal, isPublic} = routine;

        
    
        return (<div className='routine' key={id}>
            <div className="main-content"> 
            <div className="inner"> 
            <h3>{name.toUpperCase()}</h3>
            <p>{goal}</p>
            <div>Public? <input type='checkbox' checked={isPublic} readOnly></input></div>
            <Link to='/editactivity'><button onClick={handleClick}>EDIT</button></Link>

        </div>
        </div> 
        </div>)
  
}

export default ActivityView;