import { VideoPlayer } from '../../../components/VideoPlayer/VideoPlayer'
import { img } from 'assets/img'

export const CardVideo = ({ cardVideo }) => {
  return (
    <div className="video fw grid tc-a1 g8">
      <img className="section-icon" src={img.video} alt="" />
      <h3 className="gc2">Card Video</h3>
      <VideoPlayer className="gc2" videoUrl={cardVideo} />
    </div>
  )
}
