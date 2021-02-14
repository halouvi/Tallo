import { httpService } from './httpService.js'

export const userService = {
  query: query => httpService.get(`user/users/${query}`),
  
  validateEmail: email => httpService.get(`user/validate_email/${email}`),

  login: creds => httpService.post(creds ? 'auth/login' : 'auth/refresh_token/login', creds),

  signup: creds => httpService.post('auth/signup', creds),

  logout: () => httpService.post('auth/logout')
}
