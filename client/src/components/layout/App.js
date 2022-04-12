import Home from '../home/Home';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <>
<ChakraProvider>      
  <Home />
</ChakraProvider>
    </>
  );
}

export default App;
