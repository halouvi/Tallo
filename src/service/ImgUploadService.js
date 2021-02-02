import axios from 'axios'
import { getNewTokens, newTokensNeeded } from './httpService'

const UPLOAD_PRESET = 'iuzstnbj'
const CLOUD_NAME = 'ariecloud'
const VIDEO = 'video/upload'
const IMAGE = 'image/upload'
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/`

export const uploadImg = ev => _upload(ev, IMAGE)

export const uploadVideo = ev => _upload(ev, VIDEO)

const _upload = async (ev, endpoint) => {
  const FORM_DATA = new FormData()
  FORM_DATA.append('file', ev.target.files[0])
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)
  try {
    if (newTokensNeeded()) await getNewTokens()
    const res = await axios({
      method: 'POST',
      url: UPLOAD_URL + endpoint,
      data: FORM_DATA
    })
    return res.data
  } catch (err) {
    console.log('ERROR:', err)
  }
}

// export const uploadVideo = async ev => {
//   const UPLOAD_PRESET = 'iuzstnbj'
//   const CLOUD_NAME = 'ariecloud'
//   const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`
//   const FORM_DATA = new FormData()

//   FORM_DATA.append('file', ev.target.files[0])
//   FORM_DATA.append('upload_preset', UPLOAD_PRESET)

//   try {
//     if (newTokensNeeded()) await getNewTokens()
//     const res = await axios.post(UPLOAD_URL, FORM_DATA)
//     return res.data
//   } catch (err) {
//     console.log('ERROR:', err)
//   }
// }
