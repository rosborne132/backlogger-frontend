import React, { Component } from "react";

import { ValidationError, Required, InputGroup } from '../../Utils/Utils'

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

  createInput = inputValue => {
    return (
      <InputGroup 
        labelFor="name"
        labelText="Name:"
        inputType="text"
        inputName="name"
        inputClass="w-100"
        inputValue={inputValue}
        inputPlaceholder="Edit Game Name"
        onChange={this.updateTitle}
        />
    )
  }

  createConsoleDropwdown = consoles => {
    return (
      <p>
        <label className="flex pv2" htmlFor="console">Console: <Required /></label>
        <select className="black bg-white w-100" name="console" onChange={this.updateConsole}>
          <option>Select your console</option>
          {consoles.map(console => (
            <option key={console.id} value={console.console_id}>{console.title}</option>
          ))}
        </select>
      </p>
    )
  }

  createTimeDropdown = updateGameTime => {
    return ( 
      <p>
        <label className="flex pv2" htmlFor="gameConsole">Time Expected to Complete:</label>
        <select className="black bg-white w-100" name="gameConsole" value={updateGameTime} onChange={this.updateGameTime}>
          <option>Select your time</option>
          <option value="1-10hrs">1-10hrs</option>
          <option value="10-20hrs">10-20hrs</option>
          <option value="20-30hrs">20-30hrs</option>
          <option value="30-40hrs">30-40hrs</option>
          <option value="50-60hrs">50-60hrs</option>
        </select>
      </p>
    )
  }

  createNotes = noteValue => {
    return (
      <p>
        <label className="flex" htmlFor="notes">Notes: </label>
        <textarea className="ba db b--black-20 pa2 mb2 w-100" onChange={this.updateContent} value={noteValue} />
      </p>
    )
  }

  createCheckbox = (currentGameLabel, currentGame, updateMethod) => {
    return (
      <p className="flex justify-between">
        <label className="" htmlFor="currentGame">{currentGameLabel}</label>
        <input 
          type="checkbox"
          name="currentGame"
          checked={currentGame}
          onChange={updateMethod}
          />
      </p>
    )
  }

  render() {
    const { consoles } = this.context
    const { title, currentGame, notes, updateGameTime, updateComplete } = this.state

    return (
        <form className="br1 measure mv4 pa3 shadow-3 center" onSubmit={this.handleSubmit}>
          <fieldset className="bn w-70 center">
            <legend className="f3 tc">Update game!</legend>
            <ValidationError
              hasError={!this.state.titleValid}
              message={this.state.validationMessages.name}
            />
            { this.createInput(title) }
            { this.createConsoleDropwdown(consoles) }
            { this.createTimeDropdown(updateGameTime) }
            { this.createNotes(notes) }
            { this.createCheckbox("Current Game:", currentGame, this.updateCurrentGame) }
            { this.createCheckbox("Game Completed?", updateComplete, this.updateGameComplete) }
            <button type="submit" className="black bg-white hover ph3 pv2 db center">Submit</button>
          </fieldset>
        </form>
    );
  }
}

export default UpdateGameForm;
