import {
  Container,
  SimpleGrid,
  Image,
  Stack,
  StackDivider,
  Icon,
  Input,
  Button,
  Spinner,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from '@chakra-ui/react';
import Feature from './Feature.js';
import { FcInfo } from 'react-icons/fc';
import axios from 'axios';
import { useState } from 'react';
import Camera from './Camera.js';

const Home = () => {
  //use states used throuhh the component
  const [file, setFile] = useState();
  const [img, setImg] = useState();
  const [segmentedImg, setSegmentedImg] = useState();
  const [clicked, setClicked] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [uploadEnabled, setUploadEnabled] = useState(true)
  //show image when uploaded
  const handleChange = e => {
    // remove segmented image from screen when new image is selected
    setSegmentedImg(undefined);
    //clicked to false, when new image i selected upload hasn't been used yet
    setClicked(false);
    setFile(e.target.files[0]);
    setUploadEnabled(false)
    setImg(URL.createObjectURL(e.target.files[0]));
  };


  //uploading and fecthing image logic
  const handleSubmit = e => {
    e.preventDefault();
    setSegmentedImg(undefined);
    setClicked(true);

    const formData = new FormData();
    formData.append('file', file);

    //upload image and fetch it after segmentation
    const upload = async () => {
      await axios
        .post('http://localhost:8000/upload', formData, {
          headers: { 'Content-type': 'multipart/form-data' },
        })
        .then(() => {
          axios.get('http://localhost:8000/picture').then(res => {
            setSegmentedImg(res.data[0].img_link);
          });
        });
    };

    upload();
  };

  return (
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 3, md: 2 }} spacing={15}>
        <Stack spacing={4}>
          <Image
            src={'./assets/phishar.png'}
            width={300}
            height={100}
            position="relative"
          />
          <Feature
            icon={<Icon as={FcInfo} w={5} h={5} />}
            text={'Upload an image for segmentation or use your camera!'}
          />
          <Button
            onClick={onOpen}
            bg={'purple.400'}
            rounded={'full'}
            px={6}
            _hover={{
              bg: 'purple.500',
            }}
          >
            Camera
          </Button>
          <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <Camera />
            </ModalContent>
          </Modal>
          <form onSubmit={handleSubmit}>
            <Input
              type="file"
              onChange={handleChange}
              bg={'whiteAlpha.300'}
              rounded={'full'}
              px={6}
              placeholder="Click to upload image"
              accept="image/*"
            />
            <Input
              type="submit"
              value="Upload"
              width={200}
              marginTop={5}
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}
              disabled={uploadEnabled}
            />
          </form>

          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem w={513} h={513}>
              {typeof img != 'undefined' && (
                <Image src={img} width={513} height={513} />
              )}
            </GridItem>
            <GridItem w={513} h={513}>
              
              {
              /* if uplaod is activated and the image is segmented, show the result, otherwise load spinner and wait for result*/ 
              clicked &&
                ((typeof segmentedImg != 'undefined' && (
                  <Image src={segmentedImg} width={513} height={513} />
                )) || <Spinner />)}
            </GridItem>
          </Grid>

          <Stack spacing={4} divider={<StackDivider />}></Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default Home;
