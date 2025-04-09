import React from 'react';
import axios from 'axios';
const handleUploadImage = async (file) => {
    if (!file) {
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
        return response.data; 
    } catch (error) {
        console.error(error);
    }
};

const handleUploadAudio = async (file) => {
    if (!file) {
        return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); 
    formData.append('cloud_name', 'dkh3af36d'); 
    formData.append('resource_type', 'auto'); 

    try {
        const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dkh3af36d/auto/upload', 
            formData
        );
        return response.data;
    } catch (error) {

    }
};

export { handleUploadImage, handleUploadAudio };
