import axios from 'axios';

export const saveCroppedImage = async (croppedImage) => {
  try {
    const response = await axios.post(`http://localhost:8000/api/save-cropped-image`, {
      croppedImage: croppedImage
    });
    console.log(response.data.message);
  } catch (error) {
    console.error(error);
  }
};

export const saveUploadedImage = async (uploadedImage) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/save-uploaded-image`, {
        uploadedImage:uploadedImage
      });
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };