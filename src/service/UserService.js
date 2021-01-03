export const userService = {
  getUserById(id = '34fF2') {
    return users.find(user => user._id === id)
  },
}
const users = [
  {
    _id: '34fF2',
    name: 'Ochoa Hyde',
    coins: 100,
    moves: [],
  },
]
