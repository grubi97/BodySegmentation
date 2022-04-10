import { useRef } from 'react';
import Webcam from 'react-webcam';
import loadModel from '../../utils/model';
import * as tf from '@tensorflow/tfjs';
tf.enableProdMode();

const Camera = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runSegment = async () => {
    setInterval(() => {
      segmentation();
    }, 1000);
  };

  const segmentation = async () => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;

      let segmMap;
      let height;
      let width;
      await loadModel(video).then(model =>
        model.segment(video).then(output => {
          segmMap = output.segmentationMap;
          height = output.height;
          width = output.width;

          // Set video width
          webcamRef.current.video.width = width;
          webcamRef.current.video.height = height;

          canvasRef.current.width = width;
          canvasRef.current.height = height;

          const ctx = canvasRef.current.getContext('2d');

          // console.log(segmMap)
          const out = new ImageData(segmMap, width, height);
          console.log(out);
          ctx.putImageData(out, 0, 0);
        })
      );

      // const opacity = 0.7;
      // const maskBlurAmount = 0;
      // Set canvas height and width
    }
  };
  runSegment();

  return (
    <>
      <Webcam
        ref={webcamRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zindex: 9,
          width: 513,
          height: 513,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zindex: 9,
          width: 513,
          height: 513,
        }}
      />
    </>
  );
};

export default Camera;
