export const makeId = (length = 8) => {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

export const capitalize = string => {
  return string
    ? string
        .toLowerCase()
        .split(/,|-| /)
        .map(s => s[0].toUpperCase() + s.substring(1))
        .join(' ')
    : ''
}

export const colorPicker = (name = 'a') => {
  const test = range => new RegExp(`(?=[${range}])`, 'i').test(name[1])
  switch (true) {
    case test('a-c'):
      return 'red'
    case test('d-f'):
      return 'orange'
    case test('g-i'):
      return 'yellow'
    case test('j-l'):
      return 'green'
    case test('m-o'):
      return 'blue'
    case test('p-r'):
      return 'purple'
    case test('s-u'):
      return 'pink'
    case test('v-x'):
      return 'black'
    case test('y-z'):
      return 'gold'
    default:
      return 'gray'
  }
}

export const disableAltKeyBlur = () => ev => ev.key === 'Alt' && ev.preventDefault()

export const isRedundantClickAway = ev => {
  return ev.isRedundantClickAway || (ev.target === document.body && ev.type === 'click')
}