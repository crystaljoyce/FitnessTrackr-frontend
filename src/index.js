import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, useHistory} from 'react-router-dom';
import { 
    AccountForm,
    Activity,
} from './components'

const App = () => {

    const [ activities, setActivities ] = useState(null)
    return <>
    <div>hey it's me...fitness trackr</div>
    <Route path="/AccountForm">
        <AccountForm/>
    </Route>
    <Route path="/Activity">
        <Activity
        activities={ setActivities }/>
    </Route>
    </>
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
)
