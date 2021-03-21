import React from 'react'

const Home = ({user}) => {

    return (<div className='home-page-text'>
        <div className="main-content"> 
        <div className="inner"> 
        <h2>Welcome to Fitness Trackr!</h2>
        <div className="main-content"> 
        
        {user.username ?
        
        <div> You are currently logged in as <b>{user.username}.</b></div>
        :
        <div>Please login above or register for an account</div>}
        
        </div>
        <div className="inner-inner"> 
        <h2 className="home-page-title"> ROUTINES </h2>
        <h3> CHECK OUT THE ROUTINES PAGE TO UPLOAD YOUR MOST RECENT WORKOUT ROUTINES.</h3>
        <br/> <br/> 
        </div> <br/> <br/>
        <div className="inner-inner"> 
        <img />
        <h2 className="home-page-title"> ACTIVITIES </h2>
        <h3> VISIT THE ACTIVITIES PAGE TO UPLOAD YOUR ACTIVITIES PERFORMED DURING YOUR WORKOUT ROUTINE.</h3>
        <br/>
        </div>
        <br/> 
        </div> 
        
        </div> 
        
    </div>)
}

export default Home;