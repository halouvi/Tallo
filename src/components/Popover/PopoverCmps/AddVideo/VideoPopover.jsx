import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useToggle } from 'react-use'
import { mediaService } from '../../../../service/mediaService.js'
import { UPDATE_CARD } from '../../../../store/board/BoardActions.js'

export const AddVideoPopover = ({ togglePopover }) => {
  const cardId = useSelector(state => state.boardReducer.card._id) || ''
  const [videoUrl, setVideoUrl] = useState('')
  // const [isUploaded, setIsUploaded] = useToggle(false)
  const dispatch = useDispatch()

  const saveVideo = ev => {
    ev.preventDefault()
    if (videoUrl) dispatch(UPDATE_CARD({ name: 'cardVideo', value: videoUrl, cardId }))
  }

  const uploadVideo = async ev => {
    // setIsUploaded(false)
    const { secure_url } = await mediaService.uploadVideo(ev)
    console.log(secure_url)
    // setIsUploaded(true)
    setVideoUrl(secure_url)
  }

  return (
    <div className="attachment-section popover-cmp">
      <button className="close-btn pos-tr" onClick={togglePopover}>
        X
      </button>
      <p>Card Video</p>
      <form action="" onSubmit={saveVideo} className="attachment-form">
        <label htmlFor="videoUrl">
          <p>Upload a video:</p>
          <div className="label-container">
            <img
              src="https://res.cloudinary.com/ariecloud/image/upload/v1611571897/tallo/PinClipart.com_button-clipart_321890_rkdp7l.png"
              alt=""
            />
            {videoUrl && (
              <svg className="uploaded-svg" width="512" height="512" viewBox="0 0 512.063 512.063">
                <g fill="#00df76">
                  <ellipse cx="256.032" cy="256.032" rx="255.949" ry="256.032" />
                  <path d="M256.032 0l-.347.004v512.055l.347.004c141.357 0 255.949-114.629 255.949-256.032S397.389 0 256.032 0z" />
                </g>
                <g fill="#fff">
                  <path d="M111.326 261.118L214.85 364.642c4.515 4.515 11.836 4.515 16.351 0l169.957-169.957c4.515-4.515 4.515-11.836 0-16.351l-30.935-30.935c-4.515-4.515-11.836-4.515-16.351 0L230.255 271.014c-4.515 4.515-11.836 4.515-16.351 0l-55.397-55.397c-4.426-4.426-11.571-4.526-16.119-.226l-30.83 29.149c-4.732 4.475-4.837 11.973-.232 16.578z" />
                  <path d="m370.223 147.398c-4.515-4.515-11.836-4.515-16.351 0l-98.187 98.187v94.573l145.473-145.473c4.515-4.515 4.515-11.836 0-16.352z" />
                </g>
              </svg>
            )}
          </div>
        </label>
        <input
          className="upload-img"
          type="file"
          name="videoUrl"
          onChange={uploadVideo}
          id="videoUrl"
        />
        <button>Save</button>
      </form>
    </div>
  )
}
