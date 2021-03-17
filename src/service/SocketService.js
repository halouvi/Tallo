import io from 'socket.io-client'
<<<<<<< HEAD
const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3030'
=======
const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '//localhost:3030/'
>>>>>>> 46d9240a48588942b05dc9bbfccd97e4edc96579
export var socket

export const socketTypes = {
  JOIN_BOARD: 'JOIN_BOARD',
  LEAVE_BOARD: 'LEAVE_BOARD',
  BOARD_UPDATED: 'BOARD_UPDATED',
}

export const socketService = {
  setup() {
    socket = io(BASE_URL)
  },
  terminate() {
    socket = null
  },
  on(eventName, cb) {
    socket.on(eventName, cb)
  },
  off(eventName, cb) {
    socket.off(eventName, cb)
  },
  emit(eventName, data) {
    socket.emit(eventName, data)
  },
}
