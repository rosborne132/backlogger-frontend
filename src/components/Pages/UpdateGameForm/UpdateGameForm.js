import React, { Component } from "react";

import { Checkbox, FormSubmitButton, Form, Fieldset, Legend, Label, Input, Select, Textarea } from "../../StyledComponents"
import { ValidationError } from '../../Utils/Utils'

import GamesContext from '../../../context/GamesContext'
// import config from "../config";

class UpdateGameForm extends Component {
  constructor() {
    super();
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
    };
  }

  static contextType = GamesContext;

  componentDidMount() {
    const gameId = this.props.match.params.gameId
    console.log(gameId)
    const gameToUpdate = this.context.games.filter(game => game.id === gameId)
    console.log(gameToUpdate)
    const { consoleId, currentGame, id, name, notes, timeToComplete } = gameToUpdate[0]

    this.setState({consoleId, currentGame, id, name, notes, timeToComplete})
    // fetch(`${config.NOTE_API_ENDPOINT}/${noteId}`, {
    //   method: 'GET'
    // })
    // .then(res => {
    //   if (!res.ok)
    //     return res.json().then(error => Promise.reject(error))

    //   return res.json()
    // })
    //   .then(resData => {
    //     this.setState({
    //       noteId,
    //       name: resData.name,
    //       folder_id: resData.folder_id,
    //       content: resData.content,
    //       value: resData.name
    //     })
    //   })
    //   .catch(error => {
    //     console.error(error)
    //     this.setState({ error })
    //   })
  }

  updateName = name =>
    this.setState({ name }, () => {
      this.validateName(name);
    });

  updateConsole = e => {
    const console = this.context.consoles.filter(cId => cId.id === e.target.value);
    const consoleIdStr = console[0].id;
    this.setState(
      {
        consoleId: consoleIdStr,
      },
      this.formValid
    );
  };

  updateContent = e => {
    this.setState({ notes: e.target.value });
  };

  updateCurrentGame = () => {
    this.setState({ currentGame: !this.state.currentGame });
  }

  updateGameTime = e => {
    this.setState({ updateGameTime: e.target.value });
  }

  validateName(fieldValue) {
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
        nameValid: !hasError
      },
      this.formValid
    );
  }

  formValid = () => {
    const { nameValid } = this.state;
    this.setState({
      formValid: nameValid
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const gameId = this.props.match.params.gameId
    const { name, consoleId, currentGame, notes, updateGameTime } = this.state;
    const game = {
      id: gameId,
      name,
      consoleId,
      currentGame,
      notes,
      timeToComplete: updateGameTime
    };
    this.context.updateGame(game)
    this.props.history.push(`/app/console/${game.consoleId}`);
    // fetch(`${config.NOTE_API_ENDPOINT}/${this.state.gameId}`, {
    //     method: "PATCH",
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //     body: JSON.stringify(game),
    //   })
    //     .then(res => {
    //       if (!res.ok) return res.json().then(e => Promise.reject(e));
    //       return res.json();
    //     })
    //     .then(folder => {
    //       this.context.updateNote(game);
    //       this.props.history.push(`/`);
    //     })
    //     .catch(error => {
    //       console.error({ error });
    //     });
  };

  render() {
    const { consoles } = this.context;
    const { name, consoleId, currentGame, notes, updateGameTime } = this.state;

    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Legend style={{display: "flex", justifyContent: "center"}}>Update game!</Legend>
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
                value={name}
                onChange={e => this.updateName(e.target.value)}
              />
            </p>

            <p>
              <Label htmlFor="console">Console: </Label>
              <Select name="console" value={consoleId} onChange={this.updateConsole}>
                {consoles.map(console => (
                  <option key={console.id} value={console.id}>{console.name}</option>
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
