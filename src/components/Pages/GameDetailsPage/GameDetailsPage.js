import React, { Component } from "react";

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
      <main>
        <header className="parallax">
          <h1>{game.name}</h1>
        </header>
        <section>
          <header>
            <h3>screenshots</h3>
          </header>
        </section>
        <section>
          <header>
            <h3>Keep track of the games you want to play</h3>
          </header>
          <p>game storyline</p>
          <p>game age_rating</p>
          <p>game time_to_beat</p>
          <p>game total rating</p>
        </section>

        <p>similar games</p>
      </main>
    );
  }
}

GameDetailsPage.defaultProps = {
  match: {
    params: {}
  }
};

export default GameDetailsPage;
