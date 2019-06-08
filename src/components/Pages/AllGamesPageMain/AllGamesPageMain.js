import React, { PureComponent, Suspense } from 'react'
// import PropTypes from 'prop-types'

import { GameError } from '../../Utils/Utils'
import { List, GameItem, GameGrid } from '../../StyledComponents'


import GamesContext from '../../../context/GamesContext'
const Game = React.lazy(() => import('../../Game/Game'))

class AllGamesPageMain extends PureComponent {
    static contextType = GamesContext
    render() {
        const getGamesForConsole = (games = []) => games.filter(game => game.currentGame !== true && game.isCompleted !== true)     
        const getCurrentGame = (games = []) => games.filter(game => game.currentGame === true) 
        
        const { games } = this.context
        
        const gamesFromConsole = getGamesForConsole(games)
        const currentGame = getCurrentGame(games)
        return (
            <>
                <GameError>
                    { currentGame.length 
                    ?
                        <div>
                            <header>
                                <h3>Current Game</h3>
                            </header>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Game 
                                    id={currentGame[0].id}
                                    name={currentGame[0].name}
                                />
                            </Suspense>
                        </div>
                    :
                        ""
                    }
                    
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

export default AllGamesPageMain