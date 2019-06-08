import React, { Component } from "react"
import axios from 'axios'

import { FormSubmitButton } from "../../StyledComponents"
import { ValidationError } from '../../Utils/Utils'

import GamesContext from '../../../context/GamesContext'
// import config from "../config"

class AddConsoleForm extends Component {
  constructor() {
    super()
    this.state = {
      consoleId: "",
      consoleName: "",
      consoleValid: false,
      formValid: false,
      consoleOptions: [
        {
          id: "29345-sdf234",
          name: "Select your console"
        },
        {
          id: "sdfgkljhweriuysdf-fghrty",
          name: "Dreamcast"
        },
        {
          id: "sdfgkljhweriuysdf-werj",
          name: "Xbox 360"
        },
        {
          id: "sdfgkljhweriuysdf-wotkfjwb",
          name: "PS2"
        }
      ]
    }
  }

  componentDidMount() {
    // fetch(`https://api-v3.igdb.com/games`, {
    //   method: "get",
    //     headers: {
    //       "mode": "no-cors",
    //       "content-type": "application/json",
    //       "user-key": "76233ae8ea669f103a0110a8a2f2332d"
    //     }
    // })
    // .then(res => {
    //   if (!res.ok) return res.json().then(e => Promise.reject(e))
    //   return res.json()
    // })
    // .then(resData => console.log(resData))
    // .catch(error => {
    //   console.error({ error })
    // })

    // axios({
    //   url: "https://api-v3.igdb.com/games",
    //   method: 'POST',
    //   mode: 'no-cors',
    //   headers: {
    //       'Access-Control-Allow-Origin': '*',
    //       'Accept': 'application/json',
    //       'user-key': '76233ae8ea669f103a0110a8a2f2332d'
    //   },
    //   data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,collection,cover,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,popularity,pulse_count,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites"
    // })
    //   .then(response => {
    //       console.log(response.data)
    //   })
    //   .catch(err => {
    //       console.error(err)
    //   })
  }

  static contextType = GamesContext

  updateConsole = e => {
    let hasError = false
    const console = this.state.consoleOptions.filter(cId => cId.name === e.target.value)
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
    const newConsole = {
      id: consoleId,
      name: consoleName,
    }
    console.log(newConsole)
    this.context.addConsole(newConsole)
    this.props.history.push(`/app/console/:${newConsole.consoleId}`)
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
  }

  capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  render() {
    const { consoleOptions } = this.state
    return (
      <>
        <form onSubmit={e => this.handleSubmit(e)}>
          <legend style={{display: "flex", justifyContent: "center"}}>Add a Console</legend>
          <ValidationError
            hasError={!this.state.consoleOptions}
          />
          <fieldset>
            <select onChange={this.updateConsole}>
              {consoleOptions.map(consoleOption => <option key={consoleOption.id} value={consoleOption.name}>{this.capitalize(consoleOption.name)}</option>)}
            </select>
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
