import React, { PureComponent } from "react"

import GamesContext from "../../../context/GamesContext"

class ConsolePageNav extends PureComponent {
    static contextType = GamesContext
    render() {
        const findGame = (games = [], gameId) => games.find(game => game.id === gameId)

        const findConsole = (consoles = [], consoleId) => consoles.find(console => console.id === consoleId)

        const { consoles, games } = this.context

        const { gameId } = this.props.match.params

        const note = findGame(games, gameId) || {};
        const console = findConsole(consoles, note.folderId);

        return (
            <>
                <span className ="hover w-100 ba pa2 db tc" onClick={this.props.history.goBack}>Back</span>

                {console && <h3>{console.name}</h3>}
            </>
        )
    }
}

ConsolePageNav.defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  };

export default ConsolePageNav