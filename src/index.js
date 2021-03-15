import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, useHistory} from 'react-router-dom';

import {
    AccountForm,
    Routines,
    Home
} from './components';

const URL = 'http://localhost:3000/api/'

const App = () => {
    const [user, setUser] = useState({username: ''});
    const [token, setToken] = useState('');
    const [routine, setRoutine] = ([]) //this may need to be changed
    const history = useHistory();

    useEffect( () => {
        setToken(localStorage.getItem('token'))
        if (token) {
            const captureToken = async () => {
                const response = await fetch(`${URL}users/me`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const meData = await response.json()
                setUser(meData)
            }
            captureToken()
        }
    }, [token])


    const handleLogout = (event) => {
        event.preventDefault()
        setUser({})
        setToken('')
        localStorage.clear()
        history.push('/')
    }

    return (<>
        <h1>Fitness Trackr</h1>
        <nav>
            <div className='nav-links'>
            <Link to='/'>HOME</Link>
            <Link to='/routines'>ROUTINES</Link>
            <Link to='/' className={user.username ? '' : 'loggedOut'} onClick={handleLogout}>LOGOUT</Link>
            <Link to='/login' className={!user.username ? '' : 'loggedOut'} >LOGIN</Link>
            </div>
        </nav>

        <div>hey it's me...fitness trackr</div>

        <Route exact path='/'>
            <Home user={user} />
        </Route>
        <Route path='/login'>
            <AccountForm type={'login'} setToken={setToken} setUser={setUser} />
        </Route>
        <Route path='/register'>
            <AccountForm type={'register'} setToken={setToken} setUser={setUser} />
        </Route>
        <Route>
            <Routines token={token} setRoutine={setRoutine} />
        </Route>

    </>)
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
)
