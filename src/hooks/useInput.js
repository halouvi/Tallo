import { useState } from 'react'
import { useSetState } from 'react-use'

export const useInput = input => {
  const [state, setState] = useState(input)
  var handleInput
  switch (typeof input) {
    case 'string':
      handleInput = ({ currentTarget: { value } }) => setState(value)
      break
    case 'object':
      handleInput = ({ currentTarget: { name, value } }) =>
        setState(prev => ({ ...prev, [name]: value }))
      break
    default:
      break
  }
  return [state, handleInput]
}

export const useInputCb = (input, callback = () => {}, timeout = 0) => {
  const [state, setState] = useInput(input)
  const [timer, setTimer] = useState(null)
  const handleInput = function (ev) {
    setState(ev)
    const { name, value } = ev.currentTarget
    clearTimeout(timer)
    setTimer(setTimeout(() => callback(name, value), timeout))
  }
  return [state, handleInput]
}
