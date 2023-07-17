import { ChakraProvider } from '@chakra-ui/react';
import { Game, GameProvider } from './components/Game';

export const App = () => (
  <ChakraProvider>
    <GameProvider>
      <Game />
    </GameProvider>
  </ChakraProvider>
);
