import { httpService } from './httpService'

export const boardService = {
  getById: async id => {
    return httpService.get(`board/${id}`)
  },
  update(board) {
    return httpService.put(`board/${board._id}`, board)
  },
}
