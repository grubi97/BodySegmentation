import {load} from "@tensorflow-models/deeplab";

const loadModel = async (image) => {
  const modelName = "pascal"; // set to your preferred model, either `pascal`, `cityscapes` or `ade20k`
  const quantizationBytes = 1; // either 1, 2 or 4
  return await load({ base: modelName, quantizationBytes });
};

export default loadModel