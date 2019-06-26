import TokenService from './token-service'
import config from '../config'

const GameApiService = {
  getMaxGameId() {
    return fetch(`${config.API_ENDPOINT}/gameId`, {
      // headers: {
      //   'authorization': `basic ${TokenService.getAuthToken()}`,
      // },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getUserGame(gameId){
    return fetch(`${config.API_ENDPOINT}/game/${gameId}`, {
      // headers: {
      //   'authorization': `basic ${TokenService.getAuthToken()}`,
      // },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getUserGames(userId) {
    return fetch(`${config.API_ENDPOINT}/games/${userId}`, {
      // headers: {
      //   'authorization': `basic ${TokenService.getAuthToken()}`,
      // },
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
        // 'authorization': `bearer ${TokenService.getAuthToken()}`,
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
        'accept': 'application/json'
        // 'authorization': `bearer ${TokenService.getAuthToken()}`,
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
        // 'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default GameApiService
