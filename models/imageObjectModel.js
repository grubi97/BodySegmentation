var mongoose = require("mongoose");
/*Image object model to be saved in the database*/ 
var imageSchema = new mongoose.Schema({
  img_link: String,
  cloudinary_id: String,
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
