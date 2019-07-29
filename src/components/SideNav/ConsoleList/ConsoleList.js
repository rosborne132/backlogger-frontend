import React, { PureComponent } from 'react'
import { NavLink, Link } from 'react-router-dom'

import GamesContext from '../../../context/GamesContext'

class ConsoleList extends PureComponent{
    static contextType = GamesContext;
    render() {
        const { consoles, games } = this.context

        const getAllUncompletedGames= (games = []) => games.filter(game => game.is_complete !== true).length
        const countGamesForConsole = (games = [], consoleId) => games.filter(game => game.console_id === consoleId && game.is_complete !== true).length
        const countCompletedGames = (games = []) => games.filter(game => game.is_complete === true).length
        return (
            <>
                <ul className="w-100 pa0 ma0">
                    <NavLink className="no-underline" to={`/app`}>
                        <li className="hover black w-100 ba pa3 tc no-underline">
                            { getAllUncompletedGames(games) } In The Backlog
                        </li>
                    </NavLink>
                    <NavLink className="no-underline" to={`/app/console`}>
                        <li className="hover black w-100 ba pa3 db tc">
                            { countCompletedGames(games) } Completed Games
                        </li>
                    </NavLink>
                    {consoles.map(console => (
                        <NavLink className="no-underline" to={`/app/console/${console.console_id}`} key={console.console_id}>
                            <li className="hover black w-100 ba pa3 db tc">
                                { countGamesForConsole(games, console.console_id) } { console.title }
                            </li>
                        </NavLink>
                    ))}
                </ul>

                <Link style={{textDecoration: "none"}} to="/app/addConsole">
                    <div className="black bg-white hover w-100 ba pa3 db tc">+ Console</div>
                </Link>
                
                { consoles.length 
                ? <Link style={{textDecoration: "none"}} to="/app/addGame">
                    <div className="black bg-white hover w-100 ba pa3 db tc">+ Game</div>
                  </Link>
                : "" }
            </>
        )
    }
}

ConsoleList.defaultProps = {
    consoles: []
  };

export default ConsoleList