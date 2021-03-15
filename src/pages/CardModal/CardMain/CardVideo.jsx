import { VideoPlayer } from '../../../components/VideoPlayer/VideoPlayer'

export const CardVideo = ({ cardVideo }) => {
  return (
    <div className="video fw grid tc-a1 g8">
      <img className="section-icon" src={process.env.PUBLIC_URL + `/Video.png`} alt="" />
      <h3 className="gc2">Card Video</h3>
      <VideoPlayer className="gc2" videoUrl={cardVideo} />
    </div>
  )
}
