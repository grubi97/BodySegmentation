const bodyPix = require('body-pix-node');
const tf = require('@tensorflow/tfjs-node');
const cv = require('opencv4nodejs')
const fs = require('fs')

/*Segmentation and image saving logic*/ 

async function loadAndPredict(path) {

    try{
        /*Load image and convert it with tensorflow since bodypix requires tensor as input*/ 
        const imgData = fs.readFileSync(path);
        const tfimage = tf.node.decodeImage(imgData);
        /*use quantized MobileNetV1 */ 
        const net = await bodyPix.load({
          architecture: 'MobileNetV1',
          outputStride: 16,
          multiplier: 0.75,
          quantBytes: 2
        });
       
        /*Call segmentation*/
        const segmentation = await net.segmentPersonParts(tfimage, {
            flipHorizontal: true,
            internalResolution: 'high',
            segmentationThreshold: 0.5
          });
          
          /*Create segmenatation mask with opencv for better perfomance*/
          const segmentationMask = new cv.Mat(segmentation.data, segmentation.height, segmentation.width, cv.CV_8UC4);
          const mask = segmentationMask.cvtColor(cv.COLOR_BGRA2BGR);

          /*Save Image with overlayed mask*/
          const imageOriginal= cv.imread(path)
          const added_image = cv.addWeighted(imageOriginal,0.4,mask,0.5,0.5)
          cv.imwrite(path+'.jpg', added_image)
        
    }catch(error){
        console.log(error)
    }
    
  }
 module.exports = loadAndPredict