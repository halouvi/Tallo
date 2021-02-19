import { useSelector } from 'react-redux'
import { VideoPlayer } from '../../ReUsables/VideoPlayer/VideoPlayer'

export const CardVideo = () => {
  const cardVideo = useSelector(state => state.boardReducer.card.cardVideo)

  return cardVideo ? (
    <div className="video fw grid tc-a1 g8">
      <img className="icon" src={process.env.PUBLIC_URL + `/AddVideo.png`} alt="" />
      <h3 className="gc2">Card Video</h3>
      <VideoPlayer className="gc2" videoUrl={cardVideo} />
    </div>
  ) : (
    <></>
  )
}
