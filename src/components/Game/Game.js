import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare, faPenSquare } from '@fortawesome/free-solid-svg-icons'

import { GameIcons, GameStyles, GameHeader, GameBody } from '../StyledComponents'

import GamesContext from '../../context/GamesContext'
import GameApiService from "../../services/game-api-service";

class Game extends PureComponent {

  static contextType = GamesContext

  handleDeleteGame = e => {
    e.preventDefault()
    const { id } = this.props
    GameApiService.deleteUserGame(parseInt(id))
    .then(message => this.context.deleteGame(id))
  }

  render() {
    const { id, title } = this.props
    return (
      <GameStyles>
        <GameHeader>
          <span>{title}</span>
        </GameHeader>

        <GameBody></GameBody>

        <GameIcons>
            <Link to={`#`} onClick={this.handleDeleteNote}><FontAwesomeIcon style={{color: "#C20500"}} onClick={this.handleDeleteGame} icon={faMinusSquare} /></Link>
            <Link to={`/app/updateGame/${id}`}><FontAwesomeIcon style={{color: "#00FAAB"}} icon={faPenSquare} /></Link>
        </GameIcons>
      </GameStyles>
    )
  }
}

Game.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
}

export default Game
