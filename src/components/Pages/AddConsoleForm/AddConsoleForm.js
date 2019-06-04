import React, { Component } from "react"
// import uuid from "uuid"

import { FormSubmitButton } from "../../StyledComponents"
import { ValidationError } from '../../Utils/Utils'

import GamesContext from '../../../context/GamesContext'
// import config from "../config"

class AddConsoleForm extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      nameValid: false,
      formValid: false,
      validationMessages: {
        name: ""
      }
    }
  }

  static contextType = GamesContext

  updateName = name =>
    this.setState({ name }, () => {
      this.validateName(name)
    })

  validateName(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages }
    let hasError = false

    fieldValue = fieldValue.trim()
    if (fieldValue.length === 0) {
      fieldErrors.name = "Name is required"
      hasError = true
    } else {
      if (fieldValue.length < 3) {
        fieldErrors.name = "Name must be at least 3 characters long"
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

  formValid() {
    this.setState({
      formValid: this.state.nameValid
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    // const folder = {
    //   id: uuid(),
    //   name: this.state.name
    // }
    // console.log(folder)
    // fetch(`${config.FOLDER_API_ENDPOINT}`, {
    //   method: "post",
    //   headers: {
    //     "content-type": "application/json"
    //   },
    //   body: JSON.stringify(folder)
    // })
    //   .then(res => {
    //     if (!res.ok) return res.json().then(e => Promise.reject(e))
    //     return res.json()
    //   })
    //   .then(folder => {
    //     this.context.addFolder(folder)
    //     this.props.history.push(`/folder/${folder.id}`)
    //   })
    //   .catch(error => {
    //     console.error({ error })
    //   })
    console.log(this.state.name)
  }

  render() {
    return (
      <>
        <form onSubmit={e => this.handleSubmit(e)}>
          <legend>Add a Folder</legend>
          <ValidationError
            hasError={!this.state.nameValid}
            message={this.state.validationMessages.name}
          />
          <fieldset>
            <div className="input-group">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                placeholder="Enter Folder Name"
                id="name"
                className="input-control"
                onChange={e => this.updateName(e.target.value)}
              />
            </div>
          </fieldset>
          <FormSubmitButton
            style={{ margin: "5px auto" }}
            buttonWidth="50%"
            type="submit"
            disabled={!this.state.formValid}
          >
            Submit
          </FormSubmitButton>
        </form>
      </>
    )
  }
}

export default AddConsoleForm
