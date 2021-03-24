import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

const URL = 'https://fittrackr-backend.herokuapp.com/api/'

const AccountForm = ({type, setToken, setUser}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const history = useHistory();
    const title = type === 'login' ? 'LOGIN' : 'REGISTER';
    const oppositeTitle = type === 'login' ? 'Not yet registered? Sign up here!' : 'Already registered? Login here!';
    const oppositeType = type === 'login' ? 'register' : 'login';

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (type === 'register' && password !== confirmPassword) {
            setLoginMessage(<div>Passwords do not match. Please try again.</div>);
        } else {
            const response = await fetch(`${URL}users/${type}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
            setLoginMessage(response.status === 500 ? <div>Username or password is incorrect.</div> : '');
            const data = await response.json();

            const token = data.token ? data.token : '';
            localStorage.setItem('token', token);

            if (token) {
                setToken(token);
                const response = await fetch(`${URL}users/me`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const meData = await response.json();
                setUser(meData);
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                history.push('/');
            }
        }
    }

    return (<div className='accountForm'>
        <div className="container"> 
        <div className="main-content"> 
        <div className="inner-inner"> 
        <h2 >{loginMessage}</h2>
        <br/>
        <h2 className="text-center">{title}</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <div className="field-label">Username </div>
                <input type='text' value={username} minLength='3' maxLength='20' required onChange={event => setUsername(event.target.value)}></input>
            </div>
            <div>
                <div className="field-label">Password </div>
                <input type='password' value={password} minLength='7' maxLength='20' required onChange={event => setPassword(event.target.value)}></input>
            </div>
            <div>
                {type === 'register' ? 
                    <>
                    <div>Confirm Password </div>
                    <input type='password' value={confirmPassword} minLength='7' maxLength='20' required onChange={event => setConfirmPassword(event.target.value)}></input>
                    </>
                : ''}
            </div>
            <button type='submit'>{title}</button>
        </form>
        <div id='opposite-account-form'><Link to={`/${oppositeType}`}>{oppositeTitle}</Link></div>
    </div>
    </div>
    </div>
    </div>)
}

export default AccountForm;