import x from 'assets/img/x.svg'
import { img } from 'assets/img'

const imgArray = Object.values(img)

export const preLoad = () => {
  const media = () => {
    imgArray.forEach(src => {
      const img = new Image()
      img.src = src
    })
  }

  media()
}
