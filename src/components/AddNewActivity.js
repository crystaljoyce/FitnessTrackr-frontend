import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';

const URL = 'https://fittrackr-backend.herokuapp.com/api/'

const AddNewActivity = ( {token} ) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();
    const BASE_URL = 'http://localhost:3000/api/'

    const handleSubmit = async (event) => { 
        event.preventDefault(); 
        
        const response = await fetch(`${URL}activities`, {
            method: 'POST',
            headers: {
            'Content-type': 'Application/json',
            'Authorization': `Bearer ${ token }`,
          },
          body: JSON.stringify({
                    name, 
                    description,
            })
        })
        const data = await response.json(); 
        setName('')
        setDescription('')
        history.push('/activities');

    } 
    return <>
    <div className="main-content"> 
        <div className="inner"> 
    <h2> ADD A NEW ACTIVITY</h2>
    <div className="addNewActivity"></div> 
    <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(event) => setName(event.target.value)}>
        </input> <br/>
        <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}>
        </input> <br/>
        <button
            type="submit">
                ADD ACTIVITY
            </button>
    </form>
    </div> 
    </div> 
    </>
}

export default AddNewActivity; 
