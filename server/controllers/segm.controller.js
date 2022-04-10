const cloudinary = require("../utils/cloudinary");
const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const model = require("../utils/model");
const saveImage = require("../utils/saveImage");
const imgModel = require("../models/model");
const PNG = require("pngjs2").PNG;
require("dotenv");

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
    // if (req.files.length <= 0) {
    //   return res
    //     .status(400)
    //     .send({ message: "You must select at least 1 file." });
    // }
    const imgData = fs.readFileSync(req.file.path);
    const tfimage = tf.node.decodeImage(imgData);
    let segmentedImage;
    let segmMap;
    let height;
    let width;

    await model(tfimage).then((model) =>
      model.segment((image = tfimage)).then((output) => {
        segmMap = output.segmentationMap;
        height = output.height;
        width = output.width;

        segmentedImage = new PNG({ width: width, height: height });
        segmentedImage.data = Buffer.from(segmMap);
      })
    );
    await saveImage(req.file.path, width, height, segmentedImage);

    const result = await cloudinary.uploader.upload(req.file.path);

    let img = new imgModel({
      img_link: result.secure_url,
      cloudinary_id: result.public_id,
      height:height,
      width:width
    });

    await img.save();
    res.sendStatus(200);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { get, upload };
