import React, { Component } from "react"

import formStyles from "../../StyledComponents/Form.modules.css"
import { Required } from '../../Utils/Utils'

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
        const userConsoles = consoles.sort((a, b) => a.title.localeCompare(b.title))
        this.setState({
          consoleOptions: [consoleOptionTitle, ...userConsoles]
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

  render() {
    const { consoleOptions } = this.state
    const { consoles } = this.context
    const consoleChoices = consoleOptions.filter(consoleOption => !consoles.some(console => console.console_id === consoleOption.id))

    return (
      <form className="br1 measure mv4 pa3 shadow-3 center"  onSubmit={this.handleSubmit}>
        <fieldset className="bn" style={formStyles.fieldset}>
          <legend className="f3 tc">Add a Console</legend>
          { this.createConsoleDropwdown(consoleChoices) }
          <button type="submit" disabled={!this.state.formValid} style={formStyles.button} className="pa2 mv2 db center">Submit</button>
        </fieldset>
      </form>
    )
  }
}

export default AddConsoleForm
