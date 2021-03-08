import { useRef } from 'react'
import { useBus, useListener } from 'react-bus'

export const VideoPlayer = ({ videoUrl, isGrouped, className }) => {
  const eventBus = useBus()
  const videoRef = useRef()

  const requestVideoFromGroup = () => !isGrouped && eventBus.emit('videoRequest', videoUrl)

  useListener('videoRequest', requestedUrl => {
    if (isGrouped && !videoRef.current.paused) {
      if (requestedUrl === videoUrl) {
        eventBus.emit('videoResponse', getVideoState())
      }
      videoRef.current.pause()
    }
  })

  const getVideoState = () => {
    const { currentTime, volume, muted } = videoRef.current
    return { currentTime, volume, muted }
  }

  useListener('videoResponse', ({ currentTime, volume, muted }) => {
    if (!isGrouped) {
      videoRef.current.currentTime = currentTime
      videoRef.current.volume = volume
      videoRef.current.muted = muted
      videoRef.current.play()
    }
  })

  return (
    <video
      className={className}
      controls
      ref={videoRef}
      onCanPlay={requestVideoFromGroup}
      onClick={ev => isGrouped && ev.preventDefault()}
      src={videoUrl}
    />
  )
}
