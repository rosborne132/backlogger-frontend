import React, { Component } from "react"
import uuid from 'uuid'

import { Checkbox, FormSubmitButton, Form, Fieldset, Legend, Label, Input, Select, Textarea } from "../../StyledComponents"
import { ValidationError } from '../../Utils/Utils'

import GamesContext from '../../../context/GamesContext'
import GameApiService from "../../../services/game-api-service";
// import config from "../config"

class AddGameForm extends Component {
  constructor() {
    super()
    this.state = {
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
    const selectedConsole = consoles.filter(cId => cId.console_id == e.target.value);
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
      // id: uuid(),
      title,
      console_id: consoleId,
      current_game: currentGame,
      notes,
      time_to_complete: updateGameTime,
      user_id: 1
    }
    // console.log(game)

    // FETCH GAME DATA FROM IGDB

    // POST NEW GAME
    GameApiService.postUserGame(game)
    .then(newGame => {
      console.log("new game posted")
      console.log(newGame)
      this.context.addGame(game)
      this.props.history.push(`/app/console/${game.console_id}`)
    })
  }

  render() {
    const { consoles } = this.context

    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Legend style={{display: "flex", justifyContent: "center"}}>Add a new game to play!</Legend>
          <ValidationError
            hasError={!this.state.titleValid}
            message={this.state.validationMessages.name}
          />
          <Fieldset>
            <p>
              <Label htmlFor="name">Name: </Label>
              <Input
                type="text"
                placeholder="Enter Note Name"
                id="name"
                onChange={this.updateName}
              />
            </p>

            <p>
              <Label htmlFor="console">Console: </Label>
              <Select name="console" onChange={this.updateConsole}>
                <option >Select your console</option>
                {consoles.map(console => (
                  <option key={console.id} value={console.console_id}>{console.title}</option>
                ))}
              </Select>
            </p>

            <p>
              <Label htmlFor="gameConsole">Time Expected to Complete:</Label>
                <Select name="gameConsole" onChange={this.updateGameTime}>
                  <option>Select your time</option>
                  <option value="1-10hrs">1-10hrs</option>
                  <option value="10-20hrs">10-20hrs</option>
                  <option value="20-30hrs">20-30hrs</option>
                  <option value="30-40hrs">30-40hrs</option>
                  <option value="50-60hrs">50-60hrs</option>
                </Select>
            </p>

            <p>
              <Label htmlFor="notes">Notes: </Label>
              <Textarea onChange={this.updateContent} />
            </p>

            <p style={{display: "flex", justifyContent: "space-between"}}>
              <Label htmlFor="currentGame">Current Game:</Label>
              <Checkbox 
                type="checkbox"
                name="currentGame"
                checked={this.state.currentGame}
                onChange={this.updateCurrentGame}
                />
            </p>
          </Fieldset>
          <FormSubmitButton
            style={{ margin: "5px auto" }}
            buttonWidth="50%"
            type="submit"
            disabled={!this.state.formValid}
          >
            Submit
          </FormSubmitButton>
        </Form>
      </>
    )
  }
}

export default AddGameForm
