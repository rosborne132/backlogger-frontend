import React, { PureComponent, Suspense } from 'react'

import { GameError } from '../../Utils/Utils'
import { List, GameItem, GameGrid } from '../../StyledComponents'

import GamesContext from '../../../context/GamesContext'
const Game = React.lazy(() => import('../../Game/Game'))

class GameCompletedMain extends PureComponent {
    static contextType = GamesContext;
    render() {
        const getCompletedGames = (games = []) => games.filter(game => game.isCompleted === true);   

        const { games } = this.context
        const gamesCompleted = getCompletedGames(games);
        return (
            <>
                <GameError>
                    <List>
                        <GameGrid>
                            {gamesCompleted.map(game => (
                                <GameItem key={game.id}>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <Game 
                                            id={game.id}
                                            title={game.title}
                                        />
                                    </Suspense>
                                </GameItem>
                            ))}
                        </GameGrid>
                    </List>
                </GameError>
            </>
        )
    }
}

export default GameCompletedMain