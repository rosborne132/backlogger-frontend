import React, { Component } from "react"
// import axios from 'axios'

import { FormSubmitButton, Form, Fieldset, Legend, Select } from "../../StyledComponents"
import { ValidationError } from '../../Utils/Utils'

import GamesContext from '../../../context/GamesContext'

import ConsoleApiService from '../../../services/console-api-service'

class AddConsoleForm extends Component {
  constructor() {
    super()
    this.state = {
      consoleId: "",
      consoleName: "",
      consoleValid: false,
      formValid: false,
      consoleOptions: []
    }
  }

  componentDidMount() {
    const consoleOptionTitle = {
      id: "29345-sdf234",
      title: "Select your console"
    }

    ConsoleApiService.getConsoles()
      .then(consoles => {
        this.setState({
          consoleOptions: [consoleOptionTitle, ...consoles]
        })
      })
  }

  static contextType = GamesContext

  updateConsole = e => {
    let hasError = false
    const console = this.state.consoleOptions.filter(cId => cId.title === e.target.value)
    const consoleIdStr = console[0].id
    if (consoleIdStr !== '29345-sdf234') {
      this.setState(
        {
          consoleId: consoleIdStr,
          consoleName: e.target.value,
          consoleValid: !hasError
        },
        this.formValid
      )
    } else {
      this.setState({ consoleValid: false },
        this.formValid
      )
    }
  }

  formValid() {
    this.setState({
      formValid: this.state.consoleValid
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { consoleId, consoleName } = this.state 
    ConsoleApiService.postUserConsole(consoleId)
      .then(newConsole => {
        const newConsoleContext = {
          title: consoleName,
          ...newConsole
        }
        this.context.addConsole(newConsoleContext)
        this.props.history.push(`/app`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  render() {
    const { consoleOptions } = this.state
    const { consoles } = this.context
    const consoleChoices = consoleOptions.filter(consoleOption => !consoles.some(console => console.console_id === consoleOption.id))
    return (
      <>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <Legend style={{display: "flex", justifyContent: "center"}}>Add a Console</Legend>
          <ValidationError
            hasError={!this.state.consoleOptions}
          />
          <Fieldset>
            <Select onChange={this.updateConsole}>
              {consoleChoices.map(consoleChoice => <option key={consoleChoice.id} value={consoleChoice.title}>{this.capitalize(consoleChoice.title)}</option>)}
            </Select>
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

export default AddConsoleForm
