import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, useHistory} from 'react-router-dom';

import { 
    AccountForm,
    Routines,
    Activity,
    Home,
    MyRoutines,
    AddNewActivity,
    ViewRoutine,
    EditRoutine,
} from './components'

const URL = 'http://localhost:3000/api/'

const App = () => {
    const [user, setUser] = useState({username: ''});
    const [ activities, setActivities ] = useState([]);
    const [token, setToken] = useState('');
    const [routine, setRoutine] = useState({});
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);
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
        <div className="logo-head"> 
        <h1 className="logo">Fitness Trackr</h1>
        </div>
        <nav>
        <div className="col-md-8 col-sm-12 text-center header-column">

            <div className='navigation'>
            <Link to='/'>HOME</Link>
            <i className="fa-circle" ></i>
            <Link to='/myroutines' className={user.username ? '' : 'loggedOut'}>MY ROUTINES</Link>
            <i className="fa fa-circle" aria-hidden="true"></i>
            <Link to='/routines'>ROUTINES</Link>
            <i className="fa fa-circle" aria-hidden="true"></i>
            { token 
            ? <Link to='/' className={user.username ? '' : 'loggedOut'} onClick={handleLogout}>LOGOUT</Link> 
            : 
            <Link to='/login' className={!user.username ? '' : 'loggedOut'} >LOGIN</Link>
            }
            <i className="fa fa-circle" aria-hidden="true"></i>
            <Link to='/activity'>Activity</Link>
            </div>
            </div>
        </nav>

        <div>Let's get physical!</div>

        <Route exact path='/'>
            <Home user={user} />
        </Route>
        <Route path='/login'>
            <AccountForm type={'login'} setToken={setToken} setUser={setUser} />
        </Route>
        <Route path='/register'>
            <AccountForm type={'register'} setToken={setToken} setUser={setUser} />
        </Route>
        <Route path='/routines'>
            <Routines />
        </Route>
        <Route path="/Activity">
            {token ? 
            <AddNewActivity token={token} /> : 
                '' }
            <Activity token={token} setActivities={ setActivities } />
        </Route>
        <Route path='/myroutines'>
            <MyRoutines token={token} user={user} setRoutine={setRoutine} name={name} setName={setName} goal={goal} setGoal={setGoal} isPublic={isPublic} setIsPublic={setIsPublic} />
        </Route>
        <Route path='/viewroutine'>
            <ViewRoutine token={token} routine={routine} setRoutine={setRoutine} setName={setName} setGoal={setGoal} setIsPublic={setIsPublic} activities={activities} setActivities={setActivities} />
        </Route>
        <Route path='/editroutine'>
            <EditRoutine token={token} routine={routine} name={name} setName={setName} goal={goal} setGoal={setGoal} isPublic={isPublic} setIsPublic={setIsPublic} />
        </Route>

    </>)
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
)
