import Axios from 'axios'
import jwtDecode from 'jwt-decode'
const BASE_URL = process.env.NODE_ENV !== 'development' ? '/api/' : '//localhost:3030/api/'
var axios = Axios.create({
  withCredentials: true
})

let accessToken = null
 
export const httpService = {
  get: (endpoint, data) => {
    return ajax(endpoint, 'GET', data)
  },
  post(endpoint, data) {
    return ajax(endpoint, 'POST', data)
  },
  put(endpoint, data) {
    return ajax(endpoint, 'PUT', data)
  },
  delete(endpoint, data) {
    return ajax(endpoint, 'DELETE', data)
  }
}

async function ajax(endpoint, method = 'get', data = null) {
  try {
    if (newTokensNeeded(endpoint)) await getNewTokens()
    const res = await axios({
      url: BASE_URL + endpoint,
      headers: { authorization: `bearer ${accessToken}` },
      method,
      data
    })
    if (typeof res.data.accessToken !== 'undefined') accessToken = res.data.accessToken
    return res.data
  } catch (err) {
    console.error(`Had issues ${method}ing to server:\n${err}`)
    throw err
  }
}

export function newTokensNeeded(endpoint = '') {
  if (endpoint.includes('logout') || endpoint.includes('login')) return false
  const { exp } = jwtDecode(accessToken)
  return Date.now() >= exp * 1000 ? true : false
}

export async function getNewTokens() {
  try {
    const res = await axios.post(`${BASE_URL}auth/refresh_token`)
    accessToken = res.data.accessToken
  } catch (error) {
    throw error
  }
}
