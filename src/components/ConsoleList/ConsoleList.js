import React, { PureComponent } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { LinkButton, Console, List } from "../StyledComponents/";

import GamesContext from '../../context/GamesContext';

class ConsoleList extends PureComponent{
    static contextType = GamesContext;
    render() {
        const { consoles, games } = this.context

        const countNotesForFolder = (games = [], consoleID) => games.filter(game => game.consoleID === consoleID).length;
        return (
            <>
                <List>
                    {consoles.map(console => (
                        <Console key={console.id}>
                            <NavLink to={`console/${console.id}`}>
                                <span>{countNotesForFolder(games, console.id)}</span>
                                <span>{console.name}</span>
                            </NavLink>
                        </Console>
                    ))}
                </List>

                <LinkButton>
                    <Link to="app/add-console">+ Console</Link>
                </LinkButton>
            </>
        )
    }
}

ConsoleList.defaultProps = {
    consoles: []
  };

export default ConsoleList