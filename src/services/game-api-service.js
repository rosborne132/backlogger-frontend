import TokenService from './token-service'
import config from '../config'

const GameApiService = {
  getUserGame(gameId){
    return fetch(`${config.API_ENDPOINT}/game/${gameId}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getUserGames() {
    return fetch(`${config.API_ENDPOINT}/games`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postUserGame(game) {
    return fetch(`${config.API_ENDPOINT}/game`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(game),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  updateUserGame(game, game_id) {
    return fetch(`${config.API_ENDPOINT}/game/${game_id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(game)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  deleteUserGame(game_id) {
    return fetch(`${config.API_ENDPOINT}/game/${game_id}`, {
      method: 'DELETE',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? console.log("Deleted", res)
          : res.ok
      )
  }
}

export default GameApiService
