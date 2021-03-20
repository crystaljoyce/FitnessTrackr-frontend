import React from 'react'

const Home = ({user}) => {

    return (<div className='home-page-text'>
        <h2>Welcome to Fitness Trac.kr</h2>
        {user.username ?
        <div>Currently logged in as <b>{user.username}</b></div>
        :
        <div>Please login above.</div>}
    </div>)
}

export default Home;