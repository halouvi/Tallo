import Axios from 'axios'
import jwtDecode from 'jwt-decode'
const BASE_URL = process.env.NODE_ENV !== 'development' ? '/api/' : 'http://192.168.1.3:3030/api/'
var axios = Axios.create({
  withCredentials: true
})

export const httpService = {
  get: async (endpoint, data) => {
    if (newTokensNeeded(endpoint)) await getNewTokens()
    return await ajax(endpoint, 'GET', data)
  },

  post: async (endpoint, data) => {
    if (newTokensNeeded(endpoint)) await getNewTokens()
    return await ajax(endpoint, 'POST', data)
  },

  put: async (endpoint, data) => {
    if (newTokensNeeded(endpoint)) await getNewTokens()
    return await ajax(endpoint, 'PUT', data)
  },

  delete: async (endpoint, data) => {
    if (newTokensNeeded(endpoint)) await getNewTokens()
    return await ajax(endpoint, 'DELETE', data)
  }
}

let accessToken = null
const ajax = async (endpoint, method, data = null) => {
  try {
    const res = await axios({
      url: BASE_URL + endpoint,
      headers: { authorization: `bearer ${accessToken}` },
      method,
      data
    })
    if (res.data.accessToken !== undefined) accessToken = res.data.accessToken
    return res.data
  } catch ({ response: { data: err } }) {
    throw err
  }
}

export const newTokensNeeded = endpoint => {
  if (endpoint.match(/login|signup|logout|validate_email/)) return false
  const { exp } = jwtDecode(accessToken)
  return Date.now() >= exp * 1000 ? true : false
}

export const getNewTokens = async () => {
  const res = await ajax('auth/refresh_token', 'POST')
  accessToken = res.data.accessToken
}
