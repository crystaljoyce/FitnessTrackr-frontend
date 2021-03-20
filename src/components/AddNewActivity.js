import React, { useState , useEffect } from 'react';
import {useHistory} from 'react-router-dom';

const AddNewActivity = ( {token} ) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();
    console.log('token: ',token)
    const BASE_URL = 'http://localhost:3000/api/'

    const handleSubmit = async (event) => { 
        event.preventDefault(); 
        
        const response = await fetch('http://localhost:3000/api/activities/', {
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
        console.log(response)
        console.log('data:  ', data)
        setName('')
        setDescription('')
        history.push('/activity');

    } 
    return <>
    <div className="main-content"> 
        <div className="inner"> 
    <h2> Add a new activity</h2>
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
                Add Activity
            </button>
    </form>
    </div> 
    </div> 
    </>
}

export default AddNewActivity; 
