import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, useHistory} from 'react-router-dom';

import {
    AccountForm,
    Home,
    Activity,
    AddNewActivity
} from './components';

const URL = 'http://fitnesstrac-kr.herokuapp.com/api/'

const App = () => {
    const [user, setUser] = useState({username: ''});
    const [ activities, setActivities ] = useState([]);
    const [token, setToken] = useState('');
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
    console.log('token in index.js ', token)

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
        <Route path='/activity'>
            <AddNewActivity
            activities={activities}
            token={token}
            />
            <Activity 
            type={'activity'} 
            setActivities={setActivities} 
            activities={activities} />
        </Route>

    </>)
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
)
