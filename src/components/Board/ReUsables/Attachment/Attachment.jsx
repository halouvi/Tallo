import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadImg } from '../../../../service/ImgUploadService.js';
import { UPDATE_CARD } from '../../../../store/board/BoardActions.js';

export const Attachment = ({card: {attachments, _id: cardId}}) => {
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const dispatch = useDispatch();

  const saveAttachment = () => {
    dispatch(UPDATE_CARD({ field: 'attachments', value: [...attachments, attachmentUrl], cardId }))
  }

  const onUploadImg = async (ev) => {
    const res = await uploadImg(ev);
    console.log(res.url);
    setAttachmentUrl(res.url)
  }

  return (
    <div className="attachment-section">
      <p>Attachments</p>
      <form action="" onSubmit={saveAttachment} className="attachment-form">
        <label htmlFor="imgUrl">
          <p>Upload an attachment:</p>
          <img src="https://cdn.onlinewebfonts.com/svg/img_192880.png" alt="" />
        </label>
        <input className="upload-img" type="file" name="imgUrl" onChange={onUploadImg} id="imgUrl" />
        <button>Save</button>
      </form>
    </div>
  )
}
