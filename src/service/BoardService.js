import utilService from './utilService'
import { httpService } from './httpService'

export const boardService = {
  // query(query = {}) {
  //   var queryURL = `?`
  //   for (const [key, value] of Object.entries(query)) {
  //     if (value) queryURL += `${key}=${value}&`
  //   }
  //   return httpService.get(`board/${queryURL}`)
  // },
  getById: async id => {
    // return boards.find(board => board._id === id)
    // try {
    return httpService.get(`board/${id}`)
    // } catch (error) {
    // throw new Error(error)
    // }
  },
  update(board) {
    // const idx = boards.findIndex(board => board._id === updatedBoard._id)
    // boards.splice(idx, 1, updatedBoard)
    // return boards[idx]
    return httpService.put(`board/${board._id}`, board)
    // return httpService.get(`board/${boardId}`)
  },
  // start(boardId) {
  //   return httpService.get(`board/${boardId}/start`)
  // },
  // remove(board) {
  //   return httpService.delete(`board/${board._id}`)
  // },
  // save(board) {
  //   if (board._id) {
  // return httpService.put(`board/${board._id}`, board)
  //   } else {
  //     return _add(board).then(board => board)
  //   }
  // },
  add(board) {
    const newBoard = {
      title: board.title,
      labels: [
        { _id: "label1", name: "Not Started", color: "red" },
        { _id: "label2", name: "In Progress", color: "orange" },
        { _id: "label3", name: "QA", color: "yellow" },
        { _id: "label4", name: "Done", color: "green" },
        { _id: "label5", name: "Production", color: "blue" }
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

const boards = [
  {
    _id: '5fe4b65432d4a24dbcb7afa2',
    title: 'MyBoard',
    lists: [
      {
        _id: 'l101',
        title: 'List 1',
        cards: [
          {
            _id: 'c101',
            title: 'Card 1',
          },
          {
            _id: 'c102',
            title: 'Card 2',
          },
          {
            _id: 'c103',
            title: 'Card 3',
          },
          {
            _id: 'c104',
            title: 'Card 4',
          },
        ],
      },
      {
        _id: 'l102',
        title: 'List 2',
        cards: [
          {
            _id: 'c201',
            title: 'Card 1',
          },
          {
            _id: 'c202',
            title: 'Card 2',
          },
          {
            _id: 'c203',
            title: 'Card 3',
          },
          {
            _id: 'c204',
            title: 'Card 4',
          },
        ],
      },
      {
        _id: 'l103',
        title: 'List 3',
        cards: [
          {
            _id: 'c301',
            title: 'Card 1',
          },
          {
            _id: 'c302',
            title: 'Card 2',
          },
          {
            _id: 'c303',
            title: 'Card 3',
          },
          {
            _id: 'c304',
            title: 'Card 4',
          },
        ],
      },
      {
        _id: 'l104',
        title: 'List 4',
        cards: [
          {
            _id: 'c401',
            title: 'Card 1',
          },
          {
            _id: 'c402',
            title: 'Card 2',
          },
          {
            _id: 'c403',
            title: 'Card 3',
          },
          {
            _id: 'c404',
            title: 'Card 4',
          },
        ],
      },
    ],
  },
]
