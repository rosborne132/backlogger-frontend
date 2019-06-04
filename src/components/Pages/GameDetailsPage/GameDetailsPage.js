import React, { Component } from "react";

import Game from '../../Game/Game'

import GamesContext from '../../../context/GamesContext'

class GameDetailsPage extends Component {
  static contextType = GamesContext;

  handleDeleteGame = gameId => {
    this.props.history.push(`/`);
  };

  render() {
    const findGame = (games = [], gameId) => games.find(game => game.id === gameId);
    const { games = [] } = this.context;
    const { gameId } = this.props.match.params;
    const game = findGame(games, gameId) || { content: "" };
    return (
      <section className="NotePageMain">
        <Game
          id={game.id}
          name={game.name}
          onDeleteNote={this.handleDeleteGame}
        />
      </section>
    );
  }
}

GameDetailsPage.defaultProps = {
  match: {
    params: {}
  }
};

export default GameDetailsPage;
