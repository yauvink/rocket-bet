import { Box } from '@chakra-ui/react';

import { GameView } from './GameView';
import { UserControls } from './UserControls';

const Game = () => {
  return (
    <Box height={'100vh'}>
      <GameView />
      <UserControls />
    </Box>
  );
};

export default Game;
