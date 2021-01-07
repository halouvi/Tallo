import { useState } from 'react';
import { uploadImg } from '../../../../service/ImgUploadService.js';

export const Attachment = (props) => {
  const [attachmentUrl, setAttachmentUrl] = useState('');

  const onUploadImg = async (ev) => {
    const res = await uploadImg(ev);
    console.log(res.url);
    setAttachmentUrl(res.url)
  }

  return (
    // <div className="attachment-section">
    //   <span>Attachment</span>
    //   <form action="">
    //     <label htmlFor="imgUrl">
    //       <p>Upload a Profile Picture:</p>
    //       <img src="https://cdn.onlinewebfonts.com/svg/img_192880.png" alt="" />
    //     </label>
    //     <input className="upload-img" type="file" name="imgUrl" onChange={onUploadImg} id="imgUrl" />
    //   </form>
    // </div>
  )
}
