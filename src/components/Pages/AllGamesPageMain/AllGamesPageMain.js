import React, { PureComponent, Suspense } from 'react'

import { GameError } from '../../Utils/Utils'
import { List, GameItem, GameGrid } from '../../StyledComponents'

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
                    <header>
                        <h3>Current Games</h3>
                    </header>
                    <Suspense fallback={<div>Loading...</div>}>
                        <List>
                            { games.map(game => (
                                <Game 
                                    key={game.id}
                                    id={game.id}
                                    title={game.title}
                                />
                            ))}
                        </List>
                    </Suspense>
                </div>
            )
        }

        const displayGames = games => {
            return (
                <List>
                    <GameGrid>
                        {games.map(game => (
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
            )
        }

        return (
            <>
                <GameError>
                    { currentGames.length ? displayCurrentGames(currentGames) : "" }
                    { displayGames(gamesFromConsole) }
                </GameError>
            </>
        )
    }
}

export default AllGamesPageMain