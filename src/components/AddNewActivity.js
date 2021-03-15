import React, { useState , useEffect } from 'react';
import Dropdown from 'react-dropdown';

const AddNewActivity = ( {token} ) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    console.log('token: ',token)
    const BASE_URL = 'http://localhost:3000/api'

    const handleSubmit = async (event) => { 
        event.preventDefault(); 
        
        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
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
        console.log('data:  ', data)
        setName('')
        setDescription('')
    } 
    return <>
    <h2> Add a new activity</h2>
    <div className="addNewActivity"></div> 
    <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(event) => setName(event.target.value)}>
        </input> <br/>
        <textarea
            type="text"
            placeholder="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}>
        </textarea> <br/>
        <button
            type="submit">
                Add Activity
            </button>
    </form>
    </>
}

export default AddNewActivity; 
