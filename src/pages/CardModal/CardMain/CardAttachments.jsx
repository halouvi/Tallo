import { useSelector } from 'react-redux'

export const CardAttachments = ({ attachments }) => {
  return (
    <div className="attachments fw grid tc-a1 g8">
      <img className="section-icon" src={process.env.PUBLIC_URL + `/Attachment.png`} alt="" />
      <h3 className="gc2">Attachments</h3>
      {attachments.slice(0, 3).map((attachment, idx) => (
        <img className="gc2 item" key={idx} src={attachment} alt="" />
      ))}
    </div>
  )
}
