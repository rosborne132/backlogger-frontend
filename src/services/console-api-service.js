import TokenService from './token-service'
import config from '../config'

const ConsoleApiService = {
  getConsoles() {
    return fetch(`${config.API_ENDPOINT}/console`, {
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
  getUserConsoles(userId) {
    return fetch(`${config.API_ENDPOINT}/console/${userId}`, {
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
  postUserConsole(consoleId, userId) {
    return fetch(`${config.API_ENDPOINT}/console`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        // 'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        console_id: consoleId,
        user_id: userId,
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default ConsoleApiService
