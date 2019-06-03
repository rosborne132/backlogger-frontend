import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import { ConsoleList, ConsolePageNav } from '../../SideNav'
import { GamePageMain } from '../../Pages'

import GamesContext from '../../../context/GamesContext'

import './App.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          consoles: [
            {
                "id": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
                "name": "NES"
            },
            {
                "id": "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
                "name": "Switch"
            },
            {
                "id": "b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1",
                "name": "GBA"
            }
          ],
          games: [
            {
                "id": "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
                "consoleID": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
                "name": "The Legend of Zelda",
                "timeToComplete": "1-10hrs",
                "notes": "Looking forward to playing this game",
                "currentGame": false
            },
            {
                "id": "d26e0034-ffaf-11e8-8eb2-f2801f1b9fd1",
                "consoleID": "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
                "name": "Octopath Traveler",
                "timeToComplete": "50-60hrs",
                "notes": "I've had this game for almost and gotten about 30% through. It's time to finish this game!",
                "currentGame": true
            },
            {
                "id": "d26e01a6-ffaf-11e8-8eb2-f2801f1b9fd1",
                "consoleID": "b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1",
                "name": "Wario Land 4",
                "timeToComplete": "1-10hrs",
                "content": "I've already played this game, but I loved it so much that I gotta play it again!",
                "currentGame": false
            },
            {
                "id": "d26e0570-ffaf-11e8-8eb2-f2801f1b9fd1",
                "consoleID": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
                "name": "Super Mario Bros 2",
                "timeToComplete": "1-10hrs",
                "content": "I really like the first Mario, so I'm looking forward to playing this!",
                "currentGame": false
            },
          ],
          error: ""
        };
    }

    createConsoleNav = () => {
        return (
            <>
                <nav className="appNav">
                    <Switch>
                        <Route exact path="/app" component={ConsoleList} />
                        <Route path="/app/console/:consoleId" component={ConsoleList} />
                        <Route path="/app/note/:noteId" component={ConsolePageNav} />
                        <Route path="/app/addConsole" component={ConsolePageNav} />
                        <Route path="/app/addNote" component={ConsolePageNav} />
                        <Route path="/app/updateNote/:noteId" component={ConsolePageNav} />
                    </Switch>
                </nav>
            </>
        )
    }

    createConsoleMain = () => {
        return (
            <>
                <main className="appMain">
                    <Switch>
                        <Route exact path="/app" component={GamePageMain} />
                        <Route path="/app/console/:consoleId" component={GamePageMain} />
                        {/* <Route path="/app/note/:noteId" component={NotePageMain} /> */}
                        {/* <Route path="/app/add-folder" component={AddFolder} />
                        <Route path="/app/add-note" component={AddNote} />
                        <Route path="/app/update-note/:noteId" component={EditNote} /> */}
                    </Switch>
                </main>
            </>
        )
    }

    render() {
        const { consoles, games } = this.state
        const contextValue = { consoles, games }

        return (
            <GamesContext.Provider value={contextValue}>
                <div className="appHomeContainer">
                    {this.createConsoleNav()}
                    {this.createConsoleMain()}
                </div>
            </GamesContext.Provider>
        )
    }
}

export default App
