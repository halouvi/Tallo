import io from 'socket.io-client'
const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '//localhost:3030'
var socket

export const socketTypes = {
  JOIN_BOARD: 'JOIN_BOARD',
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
