import { useRef } from 'react'
import { useBus, useListener } from 'react-bus'

export const VideoPlayer = ({ videoUrl, isGrouped, className }) => {
  const eventBus = useBus()
  const ref = useRef()

  const requestVideoFromGroup = () => !isGrouped && eventBus.emit('videoRequest', videoUrl)

  useListener('videoRequest', requestedUrl => {
    if (isGrouped && !ref.current.paused) {
      if (requestedUrl === videoUrl) {
        eventBus.emit('videoResponse', getVideoState())
      }
      ref.current.pause()
    }
  })

  const getVideoState = () => {
    const { currentTime, volume, muted } = ref.current
    return { currentTime, volume, muted }
  }

  useListener('videoResponse', ({ currentTime, volume, muted }) => {
    if (!isGrouped) {
      ref.current.currentTime = currentTime
      ref.current.volume = volume
      ref.current.muted = muted
      ref.current.play()
    }
  })

  return (
    <video
      className={className}
      controls
      ref={ref}
      onCanPlay={requestVideoFromGroup}
      onClick={ev => isGrouped && ev.preventDefault()}
      src={videoUrl}
    />
  )
}
