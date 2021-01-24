import utilService from './utilService'
import { httpService } from './httpService'

export const boardService = {
  getById: async id => {
    sessionStorage.setItem('boardId', id)
    return httpService.get(`board/${id}`)
  },
  update(board) {
    return httpService.put(`board/${board._id}`, board)
  },
  add(board) {
    const newBoard = {
      title: board.title,
      labels: [
        { _id: utilService.makeId(), name: "Not Started", color: "red" },
        { _id: utilService.makeId(), name: "In Progress", color: "orange" },
        { _id: utilService.makeId(), name: "QA", color: "yellow" },
        { _id: utilService.makeId(), name: "Done", color: "green" },
        { _id: utilService.makeId(), name: "Production", color: "blue" }
      ],
      users: [JSON.parse(sessionStorage.getItem('loggedUser'))],
      lists: [
        {_id: utilService.makeId(), title: 'To Do', cards:[]},
        {_id: utilService.makeId(), title: 'Doing', cards:[]},
        {_id: utilService.makeId(), title: 'Done', cards:[]},
        {_id: utilService.makeId(), title: 'QA', cards:[]}
      ],
      activity: []
    }
    return httpService.post(`board`, newBoard)
  },
}