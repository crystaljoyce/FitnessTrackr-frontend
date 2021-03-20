import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, useHistory} from 'react-router-dom';

import { 
    AccountForm,
    Routines,
    Activities,
    Home,
    MyRoutines,
    AddNewActivity,
    ViewRoutine,
    EditRoutine,
    ViewRoutineActivity,
    EditRoutineActivity
} from './components'
import EditActivity from './components/EditActivity';

const URL = 'http://localhost:3000/api/'

const App = () => {
    const [user, setUser] = useState({username: ''});
    const [activities, setActivities] = useState([]);
    const [token, setToken] = useState('');
    const [routine, setRoutine] = useState({});
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [activityName, setActivityName] = useState('');
    const [description, setDescription] = useState('')
    const [activity, setActivity] = useState({});
    const [count, setCount] = useState(0);
    const [duration, setDuration] = useState(0);
    const [id, setId] = useState('')
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
        <nav>
        <div className="col-md-8 col-sm-12 text-center header-column">
            <div className='navigation'>
            <Link to='/'>HOME</Link>
            <Link to='/myroutines' id={token ? '' : 'loggedOut-routine'}>MY ROUTINES</Link>
            <Link to='/routines'>ROUTINES</Link>
            <Link to='/' id={token ? '' : 'loggedOut-logout'} onClick={handleLogout}>LOGOUT</Link>
            <Link to='/login' id={!token ? '' : 'loggedOut-login'} >LOGIN</Link>
            <Link to='/activities'>Activities</Link>
            </div>
            </div>
        </nav>
        </div> 

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
        <Route path="/activities">
            {token ? 
            <AddNewActivity token={token} /> : 
                '' }
            <Activities token={token} setActivities={setActivities} setActivityName={setActivityName} activityName={activityName} description={description} setDescription={setDescription} setId={setId} id={id} activity={activity} />
        </Route>
        <Route path='/editactivity'> 
            <EditActivity token={token} setActivityName={setActivityName} activityName={activityName} description={description} setDescription={setDescription} setId={setId} id={id} activity={activity}/>
        </Route>
        <Route path='/myroutines'>
            { token ? 
            <MyRoutines token={token} user={user} setRoutine={setRoutine} name={name} setName={setName} goal={goal} setGoal={setGoal} isPublic={isPublic} setIsPublic={setIsPublic} /> :
             '' }
        </Route>
        <Route path='/viewroutine'>
            <ViewRoutine token={token} routine={routine} setRoutine={setRoutine} setName={setName} setGoal={setGoal} setIsPublic={setIsPublic} activities={activities} setActivities={setActivities} />
        </Route>
        <Route path='/editroutine'>
            <EditRoutine token={token} routine={routine} name={name} setName={setName} goal={goal} setGoal={setGoal} isPublic={isPublic} setIsPublic={setIsPublic} activity={activity} setActivity={setActivity} />
        </Route>
        <Route path='/viewroutineactivity'>
            <ViewRoutineActivity token={token} activity={activity} setActivity={setActivity} setCount={setCount} setDuration={setDuration} />
        </Route>
        <Route path='/editroutineactivity'>
            <EditRoutineActivity token={token} activity={activity} count={count} setCount={setCount} duration={duration} setDuration={setDuration} />
        </Route>

    </>)
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
)
