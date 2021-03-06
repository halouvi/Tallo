import { useSelector } from 'react-redux'
import { img } from 'assets/img'

export const CardAttachments = ({ attachments }) => {
  return (
    <div className="attachments fw grid tc-a1 g8">
      <img className="section-icon" src={img.attachment} alt="" />
      <h3 className="gc2">Attachments</h3>
      {attachments.slice(0, 3).map(attachment => (
        <img className="gc2 item" key={attachment} src={attachment} alt="" />
      ))}
    </div>
  )
}
