import { ChakraProvider, Box } from '@chakra-ui/react';

export const App = () => (
  <ChakraProvider>
    <Box textAlign="center" fontSize="xl">
      Hello world
    </Box>
  </ChakraProvider>
);
