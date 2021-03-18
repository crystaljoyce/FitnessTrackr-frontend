import React from 'react'

const Home = ({user}) => {

    return (<div className='home-page-text'>
        <div className="main-content"> 
        <div className="inner"> 
        <h2>Welcome to Fitness Trac.kr</h2>
        <div className="main-content"> 
        <div className="inner"> 
        {user.username ?
        <div> You are currently logged in as <b>{user.username}.</b></div>
        :
        <div>Please login above.</div>}
        </div> 
        </div> 
        </div>
        </div> 
    </div>)
}

export default Home;