import React, { PureComponent, Suspense } from 'react'
// import PropTypes from 'prop-types'

import { GameError } from '../../Utils/Utils'
import { List, GameItem, GameGrid } from '../../StyledComponents'


import GamesContext from '../../../context/GamesContext'
const Game = React.lazy(() => import('../../Game/Game'))

class GamePageMain extends PureComponent {
    static contextType = GamesContext
    render() {
        const getGamesForConsole = (games = [], consoleId) => !consoleId ? games : games.filter(game => game.consoleId === consoleId && game.isCompleted !== true)  
        
        const { consoleId } = this.props.match.params
        const { games } = this.context
        
        const gamesFromConsole = getGamesForConsole(games, consoleId)
        return (
            <>
                <GameError>
                    <List>
                        <GameGrid>
                            {gamesFromConsole.map(game => (
                                <GameItem key={game.id}>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <Game 
                                            id={game.id}
                                            name={game.name}
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

export default GamePageMain