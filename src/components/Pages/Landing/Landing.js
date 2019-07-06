import React, { Component } from 'react'

import RegistrationForm from '../Register/RegistrationForm'

import './Landing.css'

class Landing extends Component {
    render(){
        return (
            <>
                <main>
                    <header id="landingHeader" className="parallax">
                        <h1>Backlogger</h1>
                    </header>
    
                    <section style={{ backgroundColor: "#7658B5", color: "#000"}}>
                        <header>
                            <h3>Keep track of the games you want to play</h3>
                        </header>
                        <p>[<em>placeholder for screenshot of game list interface</em>]</p>
                        <p>When keeping up with new video game releases it becomes difficult to remember what games you have been meaning to play.</p>
                    </section>
    
                    <section style={{ backgroundColor: "#000", color: "#fff"}}>
                        <header>
                            <h3>Adding games to your backlog is extremely easy</h3>
                        </header>
                        <p>[<em>placeholder for screenshot of add game interface</em>]</p>
                        <p>Add games to your backlog with ease by filling out the console, title, and any comments you have.</p>
                    </section>
                    
                    <section style={{ backgroundColor: "#CBCAD0", color: "#000"}}>
                        <header>
                            <h3>Keep track of what game/games you are currently playing</h3>
                        </header>
                        <p>[<em>placeholder for screenshot of current game list interface</em>]</p>
                        <p>By listing what games you are currently playing you can put all of your focus on playing the games!</p>
                    </section>
    
                    <section id="signUp" className="parallax">
                        <header>
                            <h3>Start Logging Games Now!</h3>
                        </header>
                        <RegistrationForm />
                    </section>
                </main>
            </>
        )
    }
}

export default Landing;