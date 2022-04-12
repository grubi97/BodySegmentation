# BodySegmentation


This project was created to SHowcase body segmentation via uploading an image or real-time segmentaion with a camera.

The project is available on : 

## Project Structure ##
+ server
+ client

The server folder contains the backend logic for the model implementation via image upload. It uses express.js as the application framework and mongodb for the database. The images are stored on a cloud via cloudinary and the link is saved in the mongo database. The used model is BodyPix(more info on https://blog.tensorflow.org/2019/11/updated-bodypix-2.html) and it uses a quantized model for better perfomance.

The client folder represents the frontend of the application created in ReactJs. The UI was created with the help of chakra-UI(https://chakra-ui.com/). The user can upload an image or use the camera feed for the body segmentation.

The deeplab model is aswell implemented on the branch 'deeplab'. Deeplab works for the image upload, but there were perfomance issues when trying to implement it in real-time(even-though a quantized model was used). My final solution is with the bodypix model, but my implementation with deelab is also available.

If you inspect the page you may see a warning from React. The error accours because chakra-ui has to update its components for React18(everything works fine, I usually use chakra-ui for my frontend, but this is a new issue I noticed in the middle of development).

## Usage ##

To run the project locally first got to the server folder :
```
 cd server
 npm i
 npm start
```
and then create a .env file and write in:
```
DATABASE_URL="mongodb+srv://dbUser:123@cluster0.nmknw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
PORT=8000
CLOUD_NAME = "dxd2ckhuh"
API_KEY = "664688965294524"
API_SECRET = "9_HMq0h2cGEGMy4n3aliEjhedik"
```

After that go to the client folder:
```
 cd client
 npm i
 npm start
```
Demo:

![](./record.gif)
