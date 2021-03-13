import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, useHistory} from 'react-router-dom';

import {
    AccountForm
} from './components';

const App = () => {
    return <div>hey it's me...fitness trackr</div>
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
)
