import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'

import { GameError } from '../../Utils/Utils'
import { List, GameItem, GameGrid } from '../../StyledComponents'
import Game from '../../Game/Game'

import GamesContext from '../../../context/GamesContext'

class GamePageMain extends PureComponent {
    static contextType = GamesContext;
    render() {
        const getGamesForConsole = (games = [], consoleId) => !consoleId ? games : games.filter(game => game.consoleID === consoleId);   

        const { consoleId } = this.props.match.params;
        const { games } = this.context
        const gamesFromConsole = getGamesForConsole(games, consoleId);
        return (
            <>
                <GameError>
                    <h1>Game list page</h1>
                    
                    <List>
                        <GameGrid>
                            {gamesFromConsole.map(game => (
                                <GameItem key={game.id}>
                                    <Game 
                                        id={game.id}
                                        name={game.name}
                                    />
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