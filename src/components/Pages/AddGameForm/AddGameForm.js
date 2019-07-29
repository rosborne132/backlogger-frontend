import React, { Component } from "react"

import { ValidationError, Required, InputGroup } from '../../Utils/Utils'

import GamesContext from '../../../context/GamesContext'
import GameApiService from "../../../services/game-api-service";

class AddGameForm extends Component {
  constructor() {
    super()
    this.state = {
      id: null,
      title: "",
      consoleId: "",
      currentGame: false,
      notes: "",
      updateGameTime: "",
      titleValid: false,
      consoleValid: false,
      formValid: false,
      validationMessages: {
        title: ""
      }
    }
  }

  static contextType = GamesContext

  updateName = e => {
    const title = e.target.value
    this.setState({ title }, () => {
      this.validateTitle(title) 
    })
  }

  updateConsole = e => {
    let hasError = false
    const { consoles } = this.context
    const selectedConsole = consoles.filter(cId => parseInt(cId.console_id) === parseInt(e.target.value));
    const newConsoleId = parseInt(selectedConsole[0].console_id)
    this.setState(
      {
        consoleId: newConsoleId,
        consoleValid: !hasError
      },
      this.formValid
    )
  }

  updateContent = e => {
    this.setState({ notes: e.target.value })
  }

  updateCurrentGame = () => {
    this.setState({ currentGame: !this.state.currentGame })
  }

  updateGameTime = e => {
    this.setState({ updateGameTime: e.target.value })
  }

  validateTitle(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages }
    let hasError = false

    fieldValue = fieldValue.trim()
    if (fieldValue.length === 0) {
      fieldErrors.title = "Title is required"
      hasError = true
    } else {
      if (fieldValue.length < 2) {
        fieldErrors.title = "Title must be at least 2 characters long"
        hasError = true
      } else {
        fieldErrors.title = ""
        hasError = false
      }
    }

    this.setState(
      {
        validationMessages: fieldErrors,
        titleValid: !hasError
      },
      this.formValid
    )
  }

  formValid = () => {
    const { titleValid, consoleValid } = this.state
    this.setState({
      formValid: titleValid && consoleValid
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { title, consoleId, currentGame, notes, updateGameTime } = this.state
    
    const game = {
      title,
      console_id: consoleId,
      current_game: currentGame,
      notes,
      time_to_complete: updateGameTime,
    }

    // FETCH GAME DATA FROM IGDB

    // POST NEW GAME
    GameApiService.postUserGame(game)
    .then(newGame => {
      this.context.addGame(newGame)
      this.props.history.push(`/app/console/${game.console_id}`)
    })
  }

  createInput = () => {
    return (
      <InputGroup 
        labelFor="name"
        labelText="Name:"
        inputType="text"
        inputName="name"
        inputClass="w-100"
        inputPlaceholder="Enter Game Name"
        onChange={this.updateName}
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

  createTimeDropdown = () => {
    return ( 
      <p>
        <label className="flex pv2" htmlFor="gameConsole">Time Expected to Complete:</label>
        <select className="black bg-white w-100" name="gameConsole" onChange={this.updateGameTime}>
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

  createNotes = () => {
    return (
      <p>
        <label className="flex" htmlFor="notes">Notes: </label>
        <textarea className="ba db b--black-20 pa2 mb2 w-100" onChange={this.updateContent} />
      </p>
    )
  }

  createGameComplete = currentGame => {
    return (
      <p className="flex justify-between">
        <label className="" htmlFor="currentGame">Current Game:</label>
        <input 
          type="checkbox"
          name="currentGame"
          checked={currentGame}
          onChange={this.updateCurrentGame}
          />
      </p>
    )
  }

  render() {
    const { consoles } = this.context
    const { currentGame } = this.state

    return (
      <form className="br1 measure mv4 pa3 shadow-3 center" onSubmit={this.handleSubmit}>
        <fieldset className="bn w-70 center">
          <legend className="f3 tc">Add a new game to play!</legend>
          <ValidationError
            hasError={!this.state.titleValid}
            message={this.state.validationMessages.name}
          />
          { this.createInput() }
          { this.createConsoleDropwdown(consoles) }
          { this.createTimeDropdown() }
          { this.createNotes() }
          { this.createGameComplete(currentGame) }
          <button type="submit" disabled={!this.state.formValid} className="black bg-white hover ph3 pv2 db center">Submit</button>
        </fieldset>
      </form>
    )
  }
}

export default AddGameForm
