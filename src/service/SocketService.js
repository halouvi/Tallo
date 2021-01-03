import io from 'socket.io-client'
const BASE_URL =
  process.env.NODE_ENV === 'production' ? '/' : '//localhost:3030'
var socket

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
