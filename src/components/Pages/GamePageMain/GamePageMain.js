import React, { PureComponent, Suspense } from 'react'

import { GameError } from '../../Utils/Utils'

import GamesContext from '../../../context/GamesContext'
const Game = React.lazy(() => import('../../Game/Game'))

class GamePageMain extends PureComponent {
    static contextType = GamesContext
    render() {
        const getGamesForConsole = (games = [], consoleId) => !consoleId ? games : games.filter(game => game.console_id === consoleId && game.is_complete !== true)  
        
        const { consoleId } = this.props.match.params
        const { games } = this.context
        
        const gamesFromConsole = getGamesForConsole(games, parseInt(consoleId))
        return (
            <GameError>
                <ul className="grid w-100 pa0 ma0">
                    {gamesFromConsole.map(game => (
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
            </GameError>
        )
    }
}

export default GamePageMain