import axios from 'axios'
import { getNewTokens, newTokensNeeded } from './httpService'

const UPLOAD_PRESET = 'iuzstnbj'
const CLOUD_NAME = 'ariecloud'
const VIDEO = 'video/upload'
const IMAGE = 'image/upload'
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/`

export const mediaService = {
  uploadImg: ev => upload(ev, IMAGE),

  uploadVideo: ev => upload(ev, VIDEO)
}

const upload = async (ev, endpoint) => {
  const FORM_DATA = new FormData()
  FORM_DATA.append('file', ev.target.files[0])
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)
  try {
    if (newTokensNeeded(endpoint)) await getNewTokens()
    const res = await axios({
      method: 'POST',
      url: UPLOAD_URL + endpoint,
      data: FORM_DATA
    })
    return res.data
  } catch (err) {
    console.error('ERROR:', err)
  }
}
