import React, { Component, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

import { ConsoleList, ConsolePageNav } from '../../SideNav'

import GamesContext from '../../../context/GamesContext'

import './App.css'

const GamePageMain  = React.lazy(() => import('../GamePageMain/GamePageMain'))
const GameCompletedMain  = React.lazy(() => import('../GameCompletedMain/GameCompletedMain'))
const GameDetailsPage  = React.lazy(() => import('../GameDetailsPage/GameDetailsPage'))
const AddConsoleForm  = React.lazy(() => import('../AddConsoleForm/AddConsoleForm'))

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
                "currentGame": false,
                "isCompleted": true
            },
            {
                "id": "d26e0034-ffaf-11e8-8eb2-f2801f1b9fd1",
                "consoleID": "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
                "name": "Octopath Traveler",
                "timeToComplete": "50-60hrs",
                "notes": "I've had this game for almost and gotten about 30% through. It's time to finish this game!",
                "currentGame": true,
                "isCompleted": false
            },
            {
                "id": "d26e01a6-ffaf-11e8-8eb2-f2801f1b9fd1",
                "consoleID": "b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1",
                "name": "Wario Land 4",
                "timeToComplete": "1-10hrs",
                "content": "I've already played this game, but I loved it so much that I gotta play it again!",
                "currentGame": false,
                "isCompleted": true
            },
            {
                "id": "d26e0570-ffaf-11e8-8eb2-f2801f1b9fd1",
                "consoleID": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
                "name": "Super Mario Bros 2",
                "timeToComplete": "1-10hrs",
                "content": "I really like the first Mario, so I'm looking forward to playing this!",
                "currentGame": false,
                "isCompleted": false
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
                        <Route path="/app/console" component={ConsoleList} />
                        <Route path="/app/game/:gameId" component={ConsolePageNav} />
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
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route exact path="/app" component={GamePageMain} />
                            <Route path="/app/console/:consoleId" component={GamePageMain} />
                            <Route path="/app/console" component={GameCompletedMain} />
                            <Route path="/app/game/:gameId" component={GameDetailsPage} />
                            <Route path="/app/addConsole" component={AddConsoleForm} />
                            {/* <Route path="/app/addGame" component={AddNote} /> */}
                            {/* <Route path="/app/updateGame/:gameId" component={EditNote} /> */}
                        </Switch>
                    </Suspense>
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
