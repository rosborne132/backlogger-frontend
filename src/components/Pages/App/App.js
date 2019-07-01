import React, { Component, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

import { ConsoleList, ConsolePageNav } from '../../SideNav'

import GamesContext from '../../../context/GamesContext'

import ConsoleApiService from '../../../services/console-api-service'
import GameApiService from '../../../services/game-api-service'

import './App.css'

const GamePageMain  = React.lazy(() => import('../GamePageMain/GamePageMain'))
const AllGamesPageMain  = React.lazy(() => import('../AllGamesPageMain/AllGamesPageMain'))
const GameCompletedMain  = React.lazy(() => import('../GameCompletedMain/GameCompletedMain'))
const GameDetailsPage  = React.lazy(() => import('../GameDetailsPage/GameDetailsPage'))
const AddConsoleForm  = React.lazy(() => import('../AddConsoleForm/AddConsoleForm'))
const AddGameForm  = React.lazy(() => import('../AddGameForm/AddGameForm'))
const UpdateGameForm  = React.lazy(() => import('../UpdateGameForm/UpdateGameForm'))


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
          consoles: [],
          games: [],
          error: ""
        }
    }

    componentDidMount() {
        ConsoleApiService.getUserConsoles()
        .then(consoles => this.setState({ consoles }))
        GameApiService.getUserGames()
        .then(games => this.setState({ games }))
    }

    handleAddConsole = console => {
        this.setState({
          consoles: [...this.state.consoles, console]
        })
    }
    
    handleAddGame = game => {
        const newGames = [...this.state.games, game]
        this.setState({
          games: newGames
        })
    }
    
    handleUpdateGame = updatedGame => {
        const { games } = this.state
        const updatedGames = games.map(game => 
            (parseInt(game.id) === parseInt(updatedGame.id))
              ? updatedGame
              : game
        )
        this.setState({
          games: updatedGames
        })
    }
    
    handleDeleteGame = gameId => {
        const { games } = this.state
        const newGames = games.filter(game => game.id !== gameId)
        this.setState({
            games: newGames
        })
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
                        <Route path="/app/addGame" component={ConsolePageNav} />
                        <Route path="/app/updateGame/:gameId" component={ConsolePageNav} />
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
                            <Route exact path="/app" component={AllGamesPageMain} />
                            <Route path="/app/console/:consoleId" component={GamePageMain} />
                            <Route path="/app/console" component={GameCompletedMain} />
                            <Route path="/app/game/:gameId" component={GameDetailsPage} />
                            <Route path="/app/addConsole" component={AddConsoleForm} />
                            <Route path="/app/addGame" component={AddGameForm} />
                            <Route path="/app/updateGame/:gameId" component={UpdateGameForm} />
                        </Switch>
                    </Suspense>
                </main>
            </>
        )
    }

    render() {
        const { consoles, games } = this.state
        const contextValue = { 
            consoles,
            games,
            deleteGame: this.handleDeleteGame,
            addConsole: this.handleAddConsole,
            addGame: this.handleAddGame,
            updateGame: this.handleUpdateGame,
        }

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
