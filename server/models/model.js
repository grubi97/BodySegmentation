var mongoose = require("mongoose");

var imageSchema = new mongoose.Schema({
  img_link: String,
  cloudinary_id: String,
  height:Number,
  width:Number
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
