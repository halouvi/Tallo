import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadImg } from '../../../../service/imgUploadService.js';
import { UPDATE_CARD } from '../../../../store/board/BoardActions.js';

export const Attachment = ({ card: { attachments, _id: cardId }, togglePopover }) => {
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const dispatch = useDispatch();

  const saveAttachment = (ev) => {
    ev.preventDefault();
    dispatch(UPDATE_CARD({ name: 'attachments', value: [...attachments, attachmentUrl], cardId }))
  }

  const onUploadImg = async (ev) => {
    const res = await uploadImg(ev);
    console.log(res.url);
    setAttachmentUrl(res.url)
  }

  return (
    <div className="attachment-section reusable">
      <button className="close-btn pos-tr" onClick={togglePopover}>
        X
      </button>
      <p>Attachments</p>
      <form action="" onSubmit={saveAttachment} className="attachment-form">
        <label htmlFor="imgUrl">
          <p>Upload an attachment:</p>
          <img src="https://res.cloudinary.com/ariecloud/image/upload/v1611571897/tallo/PinClipart.com_button-clipart_321890_rkdp7l.png" alt="" />
        </label>
        <input className="upload-img" type="file" name="imgUrl" onChange={onUploadImg} id="imgUrl" />
        <button>Save</button>
      </form>
    </div>
  )
}
