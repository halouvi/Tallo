import Axios from 'axios'
const BASE_URL = process.env.NODE_ENV !== 'development' ? '/api/' : '//localhost:3030/api/'
var axios = Axios.create({
  withCredentials: true
})

export const httpService = {
  get: async (endpoint, data) => {
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
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data
    })
    return res.data
  } catch (err) {
    if (err.response.status === 401) {
      // router.push('/')
    }
    console.log(`Had issues ${method}ing to server`, err)
    throw new Error(err)
  }
}
