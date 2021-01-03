import { userService } from '../../service/UserService'

export const types = {
  GET_USER_BY_ID: 'GET_USER_BY_ID',
}

export const getUserById = id => async dispatch => {
  const user = await userService.getUserById(id)
  dispatch({ type: types.GET_USER_BY_ID, payload: user })
}
