import React, { Component } from "react";

import { Checkbox, FormSubmitButton, Form, Fieldset, Legend, Label, Input, Select, Textarea } from "../../StyledComponents"
import { ValidationError } from '../../Utils/Utils'

import GamesContext from '../../../context/GamesContext'
import GameApiService from "../../../services/game-api-service";

class UpdateGameForm extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      consoleId: "",
      currentGame: false,
      notes: "",
      updateGameTime: "",
      titleValid: false,
      formValid: false,
      validationMessages: {
        title: ""
      }
    };
  }

  static contextType = GamesContext;

  componentDidMount() {
    const gameId = this.props.match.params.gameId

    GameApiService.getUserGame(gameId)
    .then(game => {
      const { title, console_id, time_to_complete, notes, current_game } = game[0]
      this.setState({
        title,
        consoleId: console_id,
        notes,
        currentGame: current_game,
        updateGameTime: time_to_complete
      })
    })
  }

  updateName = title =>
    this.setState({ title }, () => {
      this.validateTitle(title);
    });

  updateConsole = e => {
    const { consoles } = this.context
    const selectedConsole = consoles.filter(cId => cId.console_id == e.target.value);
    const newConsoleId = parseInt(selectedConsole[0].console_id)

    this.setState(
      {
        consoleId: newConsoleId,
      },
      this.formValid
    )
  }

  updateContent = e => {
    this.setState({ notes: e.target.value });
  };

  updateCurrentGame = () => {
    this.setState({ currentGame: !this.state.currentGame });
  }

  updateGameTime = e => {
    this.setState({ updateGameTime: e.target.value });
  }

  validateTitle(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.name = "Name is required";
      hasError = true;
    } else {
      if (fieldValue.length < 2) {
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
    const gameId = this.props.match.params.gameId
    const { title, consoleId, currentGame, notes, updateGameTime } = this.state;
    const game = {
      id: gameId,
      title,
      console_id: consoleId,
      current_game: currentGame,
      notes,
      time_to_complete: updateGameTime
    }
    GameApiService.updateUserGame(game, gameId)
    .then(updatedGame => {
      console.log("Game Updated")
    })
    .catch(error => console.error({ error }))
    this.context.updateGame()
    this.props.history.push(`/app/console/${game.consoleId}`);
  };

  render() {
    const { consoles } = this.context
    const { title, consoleId, currentGame, notes, updateGameTime } = this.state

    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Legend style={{display: "flex", justifyContent: "center"}}>Update game!</Legend>
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
                value={title}
                onChange={e => this.updateName(e.target.value)}
              />
            </p>

            <p>
              <Label htmlFor="console">Console: </Label>
              <Select name="console" value={consoleId} onChange={this.updateConsole}>
                {consoles.map(console => (
                  <option key={console.console_id} value={console.console_id}>{console.title}</option>
                ))}
              </Select>
            </p>

            <p>
              <Label htmlFor="gameConsole">Time Expected to Complete:</Label>
                <Select name="gameConsole" value={updateGameTime} onChange={this.updateGameTime}>
                  <option value="1-10hrs">1-10hrs</option>
                  <option value="10-20hrs">10-20hrs</option>
                  <option value="20-30hrs">20-30hrs</option>
                  <option value="30-40hrs">30-40hrs</option>
                  <option value="50-60hrs">50-60hrs</option>
                </Select>
            </p>

            <p>
              <Label htmlFor="notes">Notes: </Label>
              <Textarea value={notes} onChange={this.updateContent} />
            </p>

            <p style={{display: "flex", justifyContent: "space-between"}}>
              <Label htmlFor="currentGame">Current Game:</Label>
              <Checkbox 
                type="checkbox"
                name="currentGame"
                checked={currentGame}
                onChange={this.updateCurrentGame}
                />
            </p>
          </Fieldset>
          <FormSubmitButton
            style={{ margin: "5px auto" }}
            buttonWidth="50%"
            type="submit"
          >
            Submit
          </FormSubmitButton>
        </Form>
      </>
    );
  }
}

export default UpdateGameForm;
