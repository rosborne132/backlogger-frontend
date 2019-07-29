import React, { Component } from 'react'

import RegistrationForm from '../Register/RegistrationForm'

import landingImage from '../../../assets//images/lorenzo-herrera-1383917-unsplash.jpg'
import signUpImage from '../../../assets//images/rhett-noonan-274786-unsplash.jpg'

class Landing extends Component {
    createLanding = () => {
        return (
            <main>
                <header className="parallax cover vh pv5" style={{backgroundImage: `url(${landingImage})`}}>
                    <h1 className="white tc f1">Backlogger</h1>
                </header>
    
                <section className="vh pv5 bg-light-purple black tc">
                    <header className="pa3 f3">
                        <h3>Keep track of the games you want to play</h3>
                    </header>
                    <p className="pa3">When keeping up with new video game releases, it becomes difficult to remember what games you have been meaning to play.</p>
                </section>
    
                <section className="vh pv5 bg-black white tc">
                    <header className="pa3 f3">
                        <h3>Adding games to your backlog is extremely easy</h3>
                    </header>
                    <iframe title="addGame" src="https://giphy.com/embed/fvNIJO5GW96IdQzJmw" style={{width: "75%"}} width="1280" height="480" frameBorder="0"></iframe>
                    <p className="pa3">Add games to your backlog with ease by filling out the console and title.</p>
                </section>
                
                <section className="vh pv5 bg-moon-gray black tc">
                    <header className="pa3 f3">
                        <h3>Keep track of what game/games you are currently playing</h3>
                    </header>
                    <iframe title="manageGames" src="https://giphy.com/embed/j0LwmQpYgFFRf8wano" style={{width: "75%"}} width="1280" height="480" frameBorder="0"></iframe>
                    <p className="pa3">By listing what games you are currently playing you can put all of your focus on playing the games!</p>
                </section>
    
                <section id="signUp" className="parallax cover vh pv5 white tc" style={{backgroundImage: `url(${signUpImage})`}}>
                    <header className="pa3 f3">
                        <h3>Start Logging Games Now!</h3>
                    </header>
                    <RegistrationForm />
                </section>
            </main>
        )
    }
    render(){
        return this.createLanding()
    }
}

export default Landing;