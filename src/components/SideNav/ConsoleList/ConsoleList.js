import React, { PureComponent } from 'react'
import { NavLink, Link } from 'react-router-dom'

import { LinkButton, Console, List } from '../../StyledComponents'

import GamesContext from '../../../context/GamesContext'

class ConsoleList extends PureComponent{
    static contextType = GamesContext;
    render() {
        const { consoles, games } = this.context

        const countGamesForConsole = (games = [], consoleId) => games.filter(game => game.consoleId === consoleId && game.isCompleted !== true).length
        const countCompletedGames = (games = []) => games.filter(game => game.isCompleted === true).length
        console.log(games)
        return (
            <>
                <List>
                    <Console>
                        <NavLink to={`/app`}>
                            <span>{games.length}</span>
                            <span>All Games</span>
                        </NavLink>
                    </Console>
                    <Console>
                        <NavLink to={`/app/console`}>
                            <span>{countCompletedGames(games)}</span>
                            <span>Completed Games</span>
                        </NavLink>
                    </Console>
                    {consoles.map(console => (
                        <Console key={console.id}>
                            <NavLink to={`/app/console/${console.id}`}>
                                <span>{countGamesForConsole(games, console.id)}</span>
                                <span>{console.name}</span>
                            </NavLink>
                        </Console>
                    ))}
                </List>

                <LinkButton>
                    <Link to="/app/addConsole">+ Console</Link>
                </LinkButton>
                <LinkButton>
                    <Link to="/app/addGame">+ Game</Link>
                </LinkButton>
            </>
        )
    }
}

ConsoleList.defaultProps = {
    consoles: []
  };

export default ConsoleList