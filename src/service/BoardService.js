import { httpService } from './httpService'
import { makeId } from './utilService'

export const boardService = {
  getById: id => httpService.get(`board/${id}`),

  update: board => httpService.put(`board/${board._id}`, board),

  add: board => httpService.post(`board`, board),

  createNewBoard: (title, userId) => ({
    title,
    users: [userId],
    activity: [],
    lists: [
      { _id: makeId(), title: 'To Do', cards: [] },
      { _id: makeId(), title: 'Doing', cards: [] },
      { _id: makeId(), title: 'Done', cards: [] },
      { _id: makeId(), title: 'QA', cards: [] }
    ],
    labels: [
      { _id: makeId(), name: 'Not Started', color: 'red' },
      { _id: makeId(), name: 'In Progress', color: 'orange' },
      { _id: makeId(), name: 'QA', color: 'yellow' },
      { _id: makeId(), name: 'Done', color: 'green' },
      { _id: makeId(), name: 'Production', color: 'blue' }
    ]
  }),

  createNewList: title => ({
    _id: makeId(),
    title,
    cards: []
  }),

  createNewCard: title => ({
    _id: makeId(),
    title,
    activity: [],
    attachments: [],
    checklist: [],
    desc: '',
    dueDate: '',
    labels: [],
    members: []
  })
}
