import React, { PureComponent, Suspense } from 'react'

import { GameError } from '../../Utils/Utils'

import GamesContext from '../../../context/GamesContext'
const Game = React.lazy(() => import('../../Game/Game'))

class GameCompletedMain extends PureComponent {
    static contextType = GamesContext;
    render() {
        const getCompletedGames = (games = []) => games.filter(game => game.is_complete === true);   

        const { games } = this.context
        const gamesCompleted = getCompletedGames(games);
        return (
            <GameError>
                <ul className="grid w-100 pa0 ma0">
                    {gamesCompleted.map(game => (
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

export default GameCompletedMain