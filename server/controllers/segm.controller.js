const cloudinary = require("../utils/cloudinary");
const imgModel = require("../models/imageObjectModel");
const modpix = require('../utils/model')
require("dotenv");




/* Fetching the last uploaded image and uploading the segmenting image */

const get = async (req, res) => {
  try {
    await imgModel
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .exec(function (err, img) {
        if (err) return err;
        res.send(img);
      });
  } catch (err) {
    throw new Error(error);
  }
};

const upload = async (req, res) => {
  try {
    await modpix(req.file.path)
    const result = await cloudinary.uploader.upload(req.file.path+'.jpg');
    let img = new imgModel({
      img_link: result.secure_url,
      cloudinary_id: result.public_id,
    });
    await img.save();
    res.sendStatus(200); 
    
  } catch (error) {
    console.log(error)
  }
};

module.exports = { get, upload };
