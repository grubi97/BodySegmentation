
import { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as bodyPix from "@tensorflow-models/body-pix";

tf.enableProdMode();


const Camera = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runBodysegment = async () => {
    //load model that is quantized for better performance
    const net =await bodyPix.load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      multiplier: 0.75,
      quantBytes: 2
    });
    console.log("BodyPix model loaded.");
    //  Loop every 100 ms
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const person = await net.segmentPerson(video);
      const mask = bodyPix.toMask(person);
      const opacity = 0.6;
      const flipHorizontal = false;
      const maskBlurAmount = 1;
      const ctx = canvasRef.current

      //use requestAnimationFrame for better performance, update animation onscreen
      requestAnimationFrame(()=>{
        bodyPix.drawMask(
          ctx,
          video,
          mask,
          opacity,
          maskBlurAmount,
          flipHorizontal
        );});

    }
  };

  useEffect(()=>{runBodysegment()}, [runBodysegment]);

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
