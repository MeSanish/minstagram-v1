import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import axiosInstance from 'src/utils/axios';

const ImagePreview = styled.img`
  width: 60px;
  height: 60px;
`

const uploadFile = async (uploadFile: FormData) => {
  try {
    const { id }: { id: string;} = await axiosInstance.post('/v1/upload', {
      upload: uploadFile
    }).then(({ data }) => data )
    .catch((error) => {
      throw error;
    })
    console.log(id);
  } catch (error) {
    throw error;
  }
}

const Upload: React.SFC<{}> = () => {
  const uploadInput = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleClick = () => {
    const uploadInputRef = uploadInput.current;
    if (uploadInputRef) {
      uploadInputRef.click();
    }
  }
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files) {
      try {
        const fileToUpload = files.item(0);
        if(fileToUpload) {
          const formData = new FormData()
          formData.append('upload', fileToUpload)
          uploadFile(formData);
        }
        const filePreview = URL.createObjectURL(fileToUpload);
        setImagePreview(filePreview)
        
      } catch (error) {
        
      }
    }
  }
  return (
    <div style={{ textAlign: 'center' }}>
      {imagePreview ? (
        <ImagePreview src={imagePreview} />
      ) : (
          <>
            <button type="button" onClick={handleClick}>Upload</button>
            <input accept="image/*" ref={uploadInput} style={{ display: 'none' }} onChange={handleChange} type="file" />
          </>
        )}
    </div>
  );
};

export default Upload;