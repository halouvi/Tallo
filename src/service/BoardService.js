import { httpService } from './httpService'

export const boardService = {
  getById: id => {
    sessionStorage.boardId = id
    return httpService.get(`board/${id}`)
  },
  update: board => {
    return httpService.put(`board/${board._id}`, board)
  },
  add: board => {
    return httpService.post(`board`, board)
  }
}
