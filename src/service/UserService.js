import { httpService } from './httpService.js'

export default {
  query: query => httpService.get(`user/users/${query}`),

  tokenLogin: async () => {
    try {
      const res = await httpService.post(`auth/refresh_token/login`)
      sessionStorage.loggedUser = JSON.stringify(res.user)
      return res
    } catch (err) {
      throw err
    }
  },

  login: async creds => {
    try {
      const res = await httpService.post(`auth/login`, creds)
      sessionStorage.loggedUser = JSON.stringify(res.user)
      return res
    } catch (err) {
      throw err
    }
  },

  signup: async creds => {
    const { user } = await httpService.post('auth/signup', creds)
    sessionStorage.loggedUser = JSON.stringify(user)
    return user
  },

  logout: async () => {
    await httpService.post('auth/logout')
    sessionStorage.clear()
  }
}
