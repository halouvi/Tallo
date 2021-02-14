export const makeId = (length = 8) => {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

export const capitalize = (string = '') => {
  return string
    .toLowerCase()
    .split(/,|-| /)
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
}

export const colorPicker = name => {
  switch (true) {
    case /(?=[a-c])/.test(name.toLowerCase()[0]):
      return 'red'
    case /(?=[d-f])/.test(name.toLowerCase()[0]):
      return 'orange'
    case /(?=[g-i])/.test(name.toLowerCase()[0]):
      return 'yellow'
    case /(?=[j-l])/.test(name.toLowerCase()[0]):
      return 'green'
    case /(?=[m-o])/.test(name.toLowerCase()[0]):
      return 'blue'
    case /(?=[p-r])/.test(name.toLowerCase()[0]):
      return 'purple'
    case /(?=[s-u])/.test(name.toLowerCase()[0]):
      return 'pink'
    case /(?=[v-x])/.test(name.toLowerCase()[0]):
      return 'black'
    case /(?=[y-z])/.test(name.toLowerCase()[0]):
      return 'gold'
    default:
      break
  }
}
