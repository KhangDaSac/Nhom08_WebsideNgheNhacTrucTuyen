// UploadFileContext.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const UploadFileContext = createContext();

export const UploadFileProvider = ({ children }) => {
    
  const handleUpload = async (file) => {
    if (!file) {
      alert('Vui lòng chọn một file ảnh trước!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');
    formData.append('cloud_name', 'dkh3af36d');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dkh3af36d/image/upload',
        formData
      );
      const publicId = response.data.public_id;
      setImagePublicId(publicId);
      alert('Upload thành công!');
    } catch (error) {
      console.error('Lỗi khi upload:', error);
      alert('Có lỗi xảy ra khi upload ảnh!');
    }
  };

  return (
    <UploadFileContext.Provider
      value={{ file, imagePublicId, handleFileChange, handleUpload }}
    >
      {children}
    </UploadFileContext.Provider>
  );
};

// Hook để sử dụng UploadFileContext
export const useUploadFileContext = () => useContext(UploadFileContext);