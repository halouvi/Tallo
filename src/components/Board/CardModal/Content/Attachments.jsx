import { useSelector } from 'react-redux'

export const Attachments = () => {
  const attachments = useSelector(state => state.boardReducer.card.attachments)

  return attachments[0] ? (
    <div className="attachments fw grid tc-a1 g8">
      <img className="icon gc1" src={process.env.PUBLIC_URL + `/Attachment.png`} alt="" />
      <h3 className="gc2">Attachments</h3>
      {attachments.slice(0, 3).map((attachment, idx) => (
        <img className="gc2 item" key={idx} src={attachment} alt="" />
      ))}
    </div>
  ) : (
    <></>
  )
}
