import { useRef } from 'react'
import { useBus, useListener } from 'react-bus'

export const VideoPlayer = ({ videoUrl, grouped, className }) => {
  const eventBus = useBus()
  const ref = useRef()

  const requestVideoFromGroup = () => !grouped && eventBus.emit('videoRequest', videoUrl)

  useListener('videoRequest', requestedUrl => {
    if (grouped && !ref.current.paused) {
      ref.current.pause()
      if (requestedUrl === videoUrl) {
        eventBus.emit('videoResponse', getVideoState())
      }
    }
  })

  const getVideoState = () => {
    const { currentTime, volume, muted } = ref.current
    return { currentTime, volume, muted }
  }

  useListener('videoResponse', ({ currentTime, volume, muted }) => {
    if (!grouped) {
      ref.current.currentTime = currentTime
      ref.current.volume = volume
      ref.current.muted = muted
      ref.current.play()
    }
  })

  return (
    <video
      controls
      ref={ref}
      src={videoUrl}
      className={className}
      onCanPlay={requestVideoFromGroup}
      onClick={ev => grouped && ev.preventDefault()}
    />
  )
}
