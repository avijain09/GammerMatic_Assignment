const fs = require('fs');


exports.saveCroppedImage = async(req, res) => {
    const { croppedImage } = req.body;
    console.log(croppedImage);
    const base64Image = croppedImage.toString().split(';base64,').pop();

    const buffer = Buffer.from(base64Image, 'base64');
    const decodedImage = buffer.toString('binary');
    const filename = `cropped-${Date.now()}.jpg`;
  
    fs.writeFile(`./cropped/${filename}`, decodedImage, { encoding: 'base64' }, (error) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to save cropped image' });
        return;
      }
  
      res.status(200).send({ message: 'Cropped image saved successfully' });
    });
  }


  exports.saveUploadedImage = async(req, res) => {
    const { uploadedImage } = req.body;
    console.log(uploadedImage);
    const base64Image = uploadedImage.toString().split(';base64,').pop();

    const buffer = Buffer.from(base64Image, 'base64');
    const decodedImage = buffer.toString('binary');
    const filename = `uploaded-${Date.now()}.jpg`;
  
    fs.writeFile(`./uploaded/${filename}`, decodedImage, { encoding: 'base64' }, (error) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to save uploaded image' });
        return;
      }
  
      res.status(200).send({ message: 'uploaded image saved successfully' });
    });
  }