const deeplab = require("@tensorflow-models/deeplab");

const loadModel = async (image) => {
  const modelName = "pascal"; // set to your preferred model, either `pascal`, `cityscapes` or `ade20k`
  const quantizationBytes = 2; // either 1, 2 or 4
  return await deeplab.load({ base: modelName, quantizationBytes });
};
module.exports = loadModel;
