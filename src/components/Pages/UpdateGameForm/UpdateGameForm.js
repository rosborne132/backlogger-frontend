import React, { Component } from "react";

import formStyles from "../../StyledComponents/Form.modules.css"
import { ValidationError, Required } from '../../Utils/Utils'

import GamesContext from '../../../context/GamesContext'
import GameApiService from "../../../services/game-api-service";

class UpdateGameForm extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      title: "",
      consoleId: "",
      currentGame: false,
      notes: "",
      updateGameTime: "",
      updateComplete: false,
      titleValid: false,
      formValid: false,
      validationMessages: {
        title: ""
      }
    };
  }

  static contextType = GamesContext

  componentDidMount() {
    const gameId = parseInt(this.props.match.params.gameId)
    const { games } = this.context
    games.map(game => {
      if(game.is_complete) {
        this.setState({
          updateCompleteDisabled: true
        })
      }
      return ""
    })

    GameApiService.getUserGame(gameId)
    .then(game => {
      const { title, console_id, time_to_complete, notes, current_game, is_complete } = game[0]
      this.setState({
        id: gameId,
        title,
        consoleId: console_id,
        notes,
        currentGame: current_game,
        updateGameTime: time_to_complete,
        updateComplete: is_complete
      })
    })
  }
  
  updateTitle = e => this.setState({ title: e.target.value }, () => {this.validateTitle()});
  
  updateContent = e => this.setState({ notes: e.target.value });
  
  updateCurrentGame = () => this.setState({ currentGame: !this.state.currentGame });
  
  updateGameComplete = () => this.setState({ updateComplete: !this.state.updateComplete });
  
  updateGameTime = e => this.setState({ updateGameTime: e.target.value });
  
  updateConsole = e => {
    const { consoles } = this.context
    const selectedConsole = consoles.filter(cId => parseInt(cId.console_id) === parseInt(e.target.value));
    const newConsoleId = parseInt(selectedConsole[0].console_id)
    
    this.setState({ consoleId: newConsoleId }, this.formValid)
  }

  validateTitle() {
    const { title } = this.state
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    if (title.length === 0) {
      fieldErrors.name = "Name is required";
      hasError = true;
    } else {
      if (title.length < 2) {
        fieldErrors.name = "Name must be at least 2 characters long";
        hasError = true;
      } else {
        fieldErrors.name = "";
        hasError = false;
      }
    }

    this.setState(
      {
        validationMessages: fieldErrors,
        titleValid: !hasError
      },
      this.formValid
    );
  }

  formValid = () => {
    const { titleValid } = this.state;
    this.setState({
      formValid: titleValid
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { id, title, consoleId, currentGame, notes, updateGameTime, updateComplete } = this.state;
    const game = {
      id,
      title,
      console_id: consoleId,
      current_game: currentGame,
      notes,
      time_to_complete: updateGameTime,
      is_complete: updateComplete
    }
    GameApiService.updateUserGame(game, id)
    .then(updatedGame => {
      console.log(updatedGame)
    })
    .catch(error => console.error({ error }))
    this.context.updateGame(game)
    this.props.history.push(`/app/console/${game.console_id}`)
  };

  render() {
    const { consoles } = this.context
    const { title, consoleId, currentGame, notes, updateGameTime, updateComplete } = this.state

    return (
      <>
        <form style={formStyles.form} onSubmit={this.handleSubmit}>
          <legend style={formStyles.legend}>Update game!</legend>
          <ValidationError
            hasError={!this.state.titleValid}
            message={this.state.validationMessages.name}
          />
          <fieldset style={formStyles.fieldset}>
            <p>
              <label style={formStyles.label} htmlFor="name">Name: <Required /></label>
              <input
                type="text"
                placeholder="Enter Note Name"
                id="name"
                style={formStyles.input}
                value={title}
                onChange={this.updateTitle}
              />
            </p>

            <p>
              <label style={formStyles.label} htmlFor="console">Console: <Required /></label>
              <select style={formStyles.select} name="console" value={consoleId} onChange={this.updateConsole}>
                {consoles.map(console => (
                  <option key={console.console_id} value={console.console_id}>{console.title}</option>
                ))}
              </select>
            </p>

            <p>
              <label style={formStyles.label} htmlFor="gameConsole">Time Expected to Complete:</label>
                <select style={formStyles.select} name="gameConsole" value={updateGameTime} onChange={this.updateGameTime}>
                  <option value="1-10hrs">1-10hrs</option>
                  <option value="10-20hrs">10-20hrs</option>
                  <option value="20-30hrs">20-30hrs</option>
                  <option value="30-40hrs">30-40hrs</option>
                  <option value="50-60hrs">50-60hrs</option>
                </select>
            </p>

            <p>
              <label style={formStyles.label} htmlFor="notes">Notes: </label>
              <textarea style={formStyles.textarea} value={notes} onChange={this.updateContent} />
            </p>

            <p style={{display: "flex", justifyContent: "space-between"}}>
              <label style={formStyles.label} htmlFor="currentGame">Current Game:</label>
              <input 
                type="checkbox"
                name="updateComplete"
                className={formStyles.checkbox}
                checked={currentGame}
                onChange={this.updateCurrentGame}
                />
            </p>

            <p style={{display: "flex", justifyContent: "space-between"}}>
              <label style={formStyles.label} htmlFor="updateComplete">Game Complete:</label>
              <input 
                type="checkbox"
                name="updateComplete"
                className={formStyles.checkbox} 
                checked={updateComplete}
                onChange={this.updateGameComplete}
                />
            </p>
          </fieldset>
          <button type="submit" style={formStyles.button}>Submit</button>
        </form>
      </>
    );
  }
}

export default UpdateGameForm;
