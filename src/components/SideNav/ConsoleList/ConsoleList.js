import React, { PureComponent } from 'react'
import { NavLink, Link } from 'react-router-dom'

import { LinkButton, Console, List } from '../../StyledComponents'

import GamesContext from '../../../context/GamesContext'

class ConsoleList extends PureComponent{
    static contextType = GamesContext;
    render() {
        const { consoles, games } = this.context

        const getAllUncompletedGames= (games = []) => games.filter(game => game.isCompleted !== true).length
        const countGamesForConsole = (games = [], consoleId) => games.filter(game => game.consoleId === consoleId && game.isCompleted !== true).length
        const countCompletedGames = (games = []) => games.filter(game => game.isCompleted === true).length
        return (
            <>
                <List>
                    <NavLink to={`/app`}>
                        <Console>
                            <span>{getAllUncompletedGames(games)}</span>
                            <span>All Games</span>
                        </Console>
                    </NavLink>
                    <NavLink to={`/app/console`}>
                        <Console>
                            <span>{countCompletedGames(games)}</span>
                            <span>Completed Games</span>
                        </Console>
                    </NavLink>
                    {consoles.map(console => (
                        <NavLink to={`/app/console/${console.id}`} key={console.id}>
                            <Console>
                                <span>{countGamesForConsole(games, console.id)}</span>
                                <span>{console.name}</span>
                            </Console>
                        </NavLink>
                    ))}
                </List>

                <Link style={{textDecoration: "none"}} to="/app/addConsole">
                    <LinkButton>+ Console</LinkButton>
                </Link>
                <Link style={{textDecoration: "none"}} to="/app/addGame">
                    <LinkButton>+ Game</LinkButton>
                </Link>
            </>
        )
    }
}

ConsoleList.defaultProps = {
    consoles: []
  };

export default ConsoleList