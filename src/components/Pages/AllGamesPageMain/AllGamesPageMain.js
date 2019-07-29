import React, { PureComponent, Suspense } from 'react'

import { GameError } from '../../Utils/Utils'

import GamesContext from '../../../context/GamesContext'

const Game = React.lazy(() => import('../../Game/Game'))

class AllGamesPageMain extends PureComponent {
    static contextType = GamesContext
    render() {
        const getGamesForConsole = (games = []) => games.filter(game => game.current_game !== true && game.is_complete !== true)     
        const getCurrentGame = (games = []) => games.filter(game => game.current_game === true && game.is_complete !== true) 
        
        const { games } = this.context
        
        const gamesFromConsole = getGamesForConsole(games)
        const currentGames = getCurrentGame(games)

        const displayCurrentGames = games => {
            return (
                <div>
                    <div className="ba pa4">
                        <header>
                            <h2 className="tc">Current Games</h2>
                        </header>

                        <Suspense fallback={<div>Loading...</div>}>
                            <ul className="w-100 pa0 ma0">
                                { games.map(game => (
                                    <li className="list" key={game.id}>
                                        <Game 
                                            id={game.id}
                                            title={game.title}
                                            />
                                    </li>
                                ))}
                            </ul>
                        </Suspense>
                    </div>
                </div>
            )
        }

        const displayGames = games => {
            return (
                <ul className="grid w-100 pa0 ma0">
                    {games.map(game => (
                        <li className="list" key={game.id}>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Game 
                                    id={game.id}
                                    title={game.title}
                                />
                            </Suspense>
                        </li>
                    ))}
                </ul>
            )
        }

        return (
            <GameError>
                { currentGames.length ? displayCurrentGames(currentGames) : "" }
                { displayGames(gamesFromConsole) }
            </GameError>
        )
    }
}

export default AllGamesPageMain