import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare, faPenSquare } from '@fortawesome/free-solid-svg-icons'

import { GameIcons, GameStyles, GameHeader, GameBody } from '../StyledComponents'
// import config from "../config"

import GamesContext from '../../context/GamesContext'

class Game extends PureComponent {

  static contextType = GamesContext

  handleDeleteGame = e => {
    e.preventDefault()
    const { id, name } = this.props
    console.log(`${name}: ${id}`)
    this.context.deleteGame(id)
    // fetch(`${config.NOTE_API_ENDPOINT}/${noteId}`, {
    //   method: "DELETE",
    //   headers: {
    //     "content-type": "application/json"
    //   }
    // })
    //   .then(res => {
    //     if (!res.ok) return res.json().then(e => Promise.reject(e))
    //     return res.json()
    //   })
    //   .then(() => {
    //     this.context.deleteNote(noteId)
    //   })
    //   .catch(error => {
    //     console.error({ error })
    //   })
  }

  render() {
    const { id, name } = this.props
    return (
      <GameStyles>
        <GameHeader>
          <Link to={`/app/game/${id}`}>{name}</Link>
        </GameHeader>

        <GameBody></GameBody>

        <GameIcons>
            <Link to={`#`} onClick={this.handleDeleteNote}><FontAwesomeIcon onClick={this.handleDeleteGame} icon={faMinusSquare} /></Link>
            <Link to={`/app/updateGame/${id}`}><FontAwesomeIcon icon={faPenSquare} /></Link>
        </GameIcons>
        
        
        
      </GameStyles>
    )
  }
}

Game.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

Game.defaultProps = {
  onDeleteGame: () => {}
}

export default Game
