const Jimp = require("jimp");

const saveImage = async (imagePath, width, height, segmentedImage) => {
  const originalImg = await Jimp.read(imagePath);

  originalImg.resize(width, height);
  segmentedImage = await Jimp.read(segmentedImage);
  originalImg.composite(segmentedImage, 0, 0, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacityDest: 1,
    opacitySource: 0.45,
  });

  await originalImg.writeAsync(imagePath);
};

module.exports = saveImage;
