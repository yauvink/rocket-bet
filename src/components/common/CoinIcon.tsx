import { Box, Text } from '@chakra-ui/react';

export const CoinIcon = () => (
  <Box
    backgroundColor="orange"
    textAlign={'center'}
    borderRadius={'50%'}
    height={'30px'}
    width={'30px'}
    alignItems={'center'}
    justifyContent={'center'}
    display={'inline-flex'}
  >
    <Text fontSize={'20px'}>€</Text>
  </Box>
);
