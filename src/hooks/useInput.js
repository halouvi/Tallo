import { useState } from 'react'

const isEvent = arg => arg?.constructor?.name === 'SyntheticBaseEvent'
const isObject = arg => arg?.constructor?.name === 'Object'

export const useInput = (initState, callback, timeout) => {
  const [state, setState] = useState(initState)
  const [timer, setTimer] = useState(null)

  const handleChangePrimitive = arg => {
    const value = isEvent(arg) ? arg.target.value ?? arg.currentTarget.value : arg
    setState(value)
    return value
  }

  const handleChangeObject = arg => {
    if (isEvent(arg)) {
      const { name, value } = arg.target.value !== undefined ? arg.target : arg.currentTarget
      setState(prev => ({ ...prev, [name]: value }))
      return { name, value }
    } else {
      setState(prev => ({ ...prev, ...arg }))
      return arg
    }
  }

  const handleChangePrimitiveCallback = (arg, shouldCallback = true) => {
    const value = handleChangePrimitive(arg)
    if (shouldCallback) {
      callback(value)
    }
  }

  const handleChangeObjectCallback = (arg, shouldCallback = true) => {
    const value = handleChangeObject(arg)
    if (shouldCallback) {
      callback(value)
    }
  }

  const handleChangePrimitiveTimeout = (arg, shouldCallback = true) => {
    const value = handleChangePrimitive(arg)
    if (shouldCallback) {
      clearTimeout(timer)
      setTimer(setTimeout(() => callback(value), timeout))
    }
  }

  const handleChangeObjectTimeout = (arg, shouldCallback = true) => {
    const value = handleChangeObject(arg)
    if (shouldCallback) {
      clearTimeout(timer)
      setTimer(setTimeout(() => callback(value), timeout))
    }
  }

  if (callback !== undefined) {
    if (typeof callback !== 'function') {
      throw new Error(`The second argument passed to the 'useInput' hook must be a function.`)
    }
    if (timeout !== undefined) {
      if (typeof timeout !== 'number') {
        throw new Error(`The third argument passed to the 'useInput' hook must be a number.`)
      }
      return [state, isObject(initState) ? handleChangeObjectTimeout : handleChangePrimitiveTimeout]
    }
    return [state, isObject(initState) ? handleChangeObjectCallback : handleChangePrimitiveCallback]
  }
  return [state, isObject(initState) ? handleChangeObject : handleChangePrimitive]
}

// const argErr = `The second argument passed to the state setter function of the 'useInput' hook determines wether or not the callback back function provided in the initial call to the hook should be fired.\nIt is 'true' by default so you should only provide the argument as 'false if needed, else, omit the argument.`
