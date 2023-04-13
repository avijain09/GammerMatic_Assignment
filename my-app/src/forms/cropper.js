import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Modal, Button, Select, Avatar, Space } from "antd";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { saveCroppedImage,saveUploadedImage} from "../functions/saveImage";


const Cropper = () => {
  const [src, setSrc] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [result, setResult] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  const handleFileChange = async (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
    const file = e.target.files[0];
    const base64Data = await getBase64Data(file);
    saveUploadedImage({ uploadedImage: base64Data });
    setSrc(URL.createObjectURL(file));
  };
  
  const getBase64Data = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

//   const handleFileChange = (e) => {
//     setSrc(URL.createObjectURL(e.target.files[0]));
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       setSrc(reader.result);
//       saveUploadedImage(reader.result);
//     };
//   };

  const handleModal = () => {
    setModalVisible(true);
  };

  const handleImageLoaded = (img) => {
    setImage(img);
    
  };

  const getCroppedImage = () => {
    if (!image) {
        console.log("image not found")
      return;
    }
    
    

    

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    setResult(base64Image);
    // console.log(result)
    saveCroppedImage({ croppedImage: base64Image });

    setModalVisible(false);
  };

  return (
    <div className="container">
      <div className="row">
        
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button className="btn btn-danger" onClick={handleModal}>
            Crop Image
          </button>
        <div className="col-6">
          
          <Modal
            title="Crop Image"
            centered
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={null}
          >
            {src && (
              <ReactCrop
              src={src}
              crop={crop}
              onChange={setCrop}
          ><img src={src} onLoad={c => handleImageLoaded(c.target)} />

          </ReactCrop>
            )}
            <button className="btn btn-primary mt-3" onClick={getCroppedImage}>
              Save
            </button>
          </Modal>
          {result && (
            <div className="col-6 ml-md-4" onClick={handleModal}>
              
              
   <Avatar size={128} src={result} icon={<UserOutlined />} />
            </div>
          )}
          <br/>
        </div>
      </div>
    </div>
  );
};

export default Cropper;