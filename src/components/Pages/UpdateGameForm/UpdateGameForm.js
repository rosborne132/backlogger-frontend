import React, { Component } from "react";

import { FormSubmitButton } from "../../StyledComponents"
import { ValidationError } from '../../Utils/Utils'

import GamesContext from '../../../context/GamesContext'
// import config from "../config";

class UpdateGameForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "Octopath",
      consoleId: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
      currentGame: true,
      notes: "Update test notes",
      updateGameTime: "10-20hrs",
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
        <form onSubmit={this.handleSubmit}>
          <legend style={{display: "flex", justifyContent: "center"}}>Update game!</legend>
          <ValidationError
            hasError={!this.state.nameValid}
            message={this.state.validationMessages.name}
          />
          <fieldset>
            <p>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                placeholder="Enter Note Name"
                id="name"
                value={name}
                onChange={e => this.updateName(e.target.value)}
              />
            </p>

            <p>
              <label htmlFor="console">Console: </label>
              <select name="console" value={consoleId} onChange={this.updateConsole}>
                {consoles.map(console => (
                  <option key={console.id} value={console.id}>{console.name}</option>
                ))}
              </select>
            </p>

            <p>
              <label htmlFor="gameConsole">Time Expected to Complete</label>
                <select name="gameConsole" value={updateGameTime} onChange={this.updateGameTime}>
                  <option value="1-10hrs">1-10hrs</option>
                  <option value="10-20hrs">10-20hrs</option>
                  <option value="20-30hrs">20-30hrs</option>
                  <option value="30-40hrs">30-40hrs</option>
                  <option value="50-60hrs">50-60hrs</option>
                </select>
            </p>

            <p>
              <label htmlFor="notes">Notes: </label>
              <textarea value={notes} onChange={this.updateContent} />
            </p>

            <p style={{display: "flex", justifyContent: "space-between"}}>
              <label htmlFor="currentGame">Current Game</label>
              <input 
                type="checkbox"
                name="currentGame"
                checked={currentGame}
                onChange={this.updateCurrentGame}
                />
            </p>
          </fieldset>
          <FormSubmitButton
            style={{ margin: "5px auto" }}
            buttonWidth="50%"
            type="submit"
          >
            Submit
          </FormSubmitButton>
        </form>
      </>
    );
  }
}

export default UpdateGameForm;
