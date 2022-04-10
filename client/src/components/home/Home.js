import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Input,
  Button,
  Box,
  AccordionDescendantsProvider,
  Spinner,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Feature from './Feature.js';
import { FcInfo } from 'react-icons/fc';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import Camera from './Camera.js';

const Home = () => {
  const colorTime = useColorModeValue('yellow.100', 'yellow.900');
  const colorMistake = useColorModeValue('red.100', 'red.900');
  const colorBorder = useColorModeValue('gray.100', 'gray.700');
  const [file, setFile] = useState();
  const [img, setImg] = useState();
  const [segmentedImg, setSegmentedImg] = useState();
  const [clicked, setClicked] = useState(false);

  const handleChange = e => {
    setSegmentedImg(undefined);
    setClicked(false);
    setFile(e.target.files[0]);
    setImg(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSegmentedImg(undefined);
    setClicked(true);

    const formData = new FormData();
    formData.append('file', file);

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
            iconBg={colorTime}
            text={'Upload an image for segmentation or use your camera!'}
          />
          <Button
            width={200}
            marginTop={5}
            colorScheme={'green'}
            bg={'purple.400'}
            rounded={'full'}
            px={6}
            _hover={{
              bg: 'purple.500',
            }}
          >
            Camera
          </Button>
          <Camera/>
          <form onSubmit={handleSubmit}>
            <Input
              type="file"
              onChange={handleChange}
              bg={'whiteAlpha.300'}
              rounded={'full'}
              px={6}
              placeholder='Click to upload image'
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
            />
          </form>

          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem w={513} h={513}>
              {typeof img != 'undefined' && (
                <Image src={img} width={513} height={513} />
              )}
            </GridItem>
            <GridItem w={513} h={513}>
              {clicked &&
                ((typeof segmentedImg != 'undefined' && (
                  <Image src={segmentedImg} width={513} height={513} />
                )) || <Spinner />)}
            </GridItem>
          </Grid>

          <Stack
            spacing={4}
            divider={<StackDivider borderColor={colorBorder} />}
          ></Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default Home;
