import React, { Component } from "react"
import uuid from 'uuid'

import { Checkbox, FormSubmitButton, Form, Fieldset, Legend, Label, Input, Select, Textarea } from "../../StyledComponents"
import { ValidationError } from '../../Utils/Utils'

import GamesContext from '../../../context/GamesContext'
// import config from "../config"

class AddGameForm extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      consoleId: "",
      currentGame: false,
      notes: "",
      updateGameTime: "",
      nameValid: false,
      consoleValid: false,
      formValid: false,
      validationMessages: {
        name: ""
      }
    }
  }

  static contextType = GamesContext

  updateName = e => {
    const name = e.target.value
    this.setState({ name }, () => {
      this.validateName(name) 
    })
  }

  updateConsole = e => {
    let hasError = false
    const console = this.context.consoles.filter(cId => cId.name === e.target.value)
    const consoleIdStr = console[0].id
    this.setState(
      {
        consoleId: consoleIdStr,
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

  validateName(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages }
    let hasError = false

    fieldValue = fieldValue.trim()
    if (fieldValue.length === 0) {
      fieldErrors.name = "Name is required"
      hasError = true
    } else {
      if (fieldValue.length < 2) {
        fieldErrors.name = "Name must be at least 2 characters long"
        hasError = true
      } else {
        fieldErrors.name = ""
        hasError = false
      }
    }

    this.setState(
      {
        validationMessages: fieldErrors,
        nameValid: !hasError
      },
      this.formValid
    )
  }

  formValid = () => {
    const { nameValid, consoleValid } = this.state
    this.setState({
      formValid: nameValid && consoleValid
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { name, consoleId, currentGame, notes, updateGameTime } = this.state
    const game = {
      id: uuid(),
      name,
      consoleId,
      timeToComplete: updateGameTime,
      notes,
      currentGame,
      isCompleted: false
    }
    this.context.addGame(game)
    this.props.history.push(`/app/console/${game.consoleId}`)
    // fetch(`${config.NOTE_API_ENDPOINT}`, {
    //   method: "post",
    //   headers: {
    //     "content-type": "application/json"
    //   },
    //   body: JSON.stringify(note)
    // })
    //   .then(res => {
    //     if (!res.ok) return res.json().then(e => Promise.reject(e))
    //     return res.json()
    //   })
    //   .then(folder => {
    //     this.context.addNote(note)
    //     this.props.history.push(`/folder/${folder.id}`)
    //   })
    //   .catch(error => {
    //     console.error({ error })
    //   })
  }

  render() {
    const { consoles } = this.context

    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Legend style={{display: "flex", justifyContent: "center"}}>Add a new game to play!</Legend>
          <ValidationError
            hasError={!this.state.nameValid}
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
                  <option key={console.id} value={console.name}>{console.name}</option>
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