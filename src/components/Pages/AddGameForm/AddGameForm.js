import React, { Component } from "react"

import formStyles from "../../StyledComponents/Form.modules.css"
import { ValidationError, Required } from '../../Utils/Utils'

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

  render() {
    const { consoles } = this.context

    return (
      <>
        <form style={formStyles.form} onSubmit={this.handleSubmit}>
          <ValidationError
            hasError={!this.state.titleValid}
            message={this.state.validationMessages.name}
          />
          <fieldset style={formStyles.fieldset}>
            <legend style={formStyles.legend}>Add a new game to play!</legend>
            <p>
              <label style={formStyles.label} htmlFor="name">Name: <Required /></label>
              <input
                type="text"
                placeholder="Enter Note Name"
                style={formStyles.input}
                id="name"
                onChange={this.updateName}
              />
            </p>

            <p>
              <label style={formStyles.label} htmlFor="console">Console: <Required /></label>
              <select style={formStyles.select} name="console" onChange={this.updateConsole}>
                <option style={formStyles.option}>Select your console</option>
                {consoles.map(console => (
                  <option key={console.id} value={console.console_id}>{console.title}</option>
                ))}
              </select>
            </p>

            <p>
              <label style={formStyles.label} htmlFor="gameConsole">Time Expected to Complete:</label>
                <select style={formStyles.select} name="gameConsole" onChange={this.updateGameTime}>
                  <option>Select your time</option>
                  <option value="1-10hrs">1-10hrs</option>
                  <option value="10-20hrs">10-20hrs</option>
                  <option value="20-30hrs">20-30hrs</option>
                  <option value="30-40hrs">30-40hrs</option>
                  <option value="50-60hrs">50-60hrs</option>
                </select>
            </p>

            <p>
              <label style={formStyles.label} htmlFor="notes">Notes: </label>
              <textarea style={formStyles.textarea} onChange={this.updateContent} />
            </p>

            <p style={{display: "flex", justifyContent: "space-between"}}>
              <label style={formStyles.label} htmlFor="currentGame">Current Game:</label>
              <input 
                type="checkbox"
                name="currentGame"
                className={formStyles.checkbox}
                checked={this.state.currentGame}
                onChange={this.updateCurrentGame}
                />
            </p>
          </fieldset>
          <button type="submit" disabled={!this.state.formValid} style={formStyles.button}>Submit</button>
        </form>
      </>
    )
  }
}

export default AddGameForm
