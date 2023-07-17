import React, { useContext } from 'react';
import { Box, Text } from '@chakra-ui/react';

import { GameContext } from '../GameProvider';
import { convertSecondsToScore } from '../../../utils';
import { GameState } from '../../../types';
import PauseOverlay from '../../common/PauseOverlay';

import useTimer from '../../../hooks/useTimer';
import rocket from '../../../assets/rocket.png';
import bg from '../../../assets/bg.jpg';
import { flyingAnimation, velocityAnimation } from './keyframes';

const GameView = React.memo(() => {
  const GAME = useContext(GameContext);
  const [timer] = useTimer(GAME);
  const isRunning = GAME?.state === GameState.IN_PROCESS;

  return (
    <Box height={'100%'}>
      {GAME?.state === GameState.WAITING && <PauseOverlay />}
      {GAME?.state === GameState.IN_PROCESS && (
        <Box position={'absolute'} top={0} right={'50%'} transform={'translateX(50%)'} textAlign={'center'}>
          <Text color={'lightgrey'} fontSize={'100px'}>
            {convertSecondsToScore(timer)}
          </Text>
        </Box>
      )}
      <Box
        height={'100%'}
        maxH={'100vh'}
        className="wrapper"
        background={`url(${bg}) center top`}
        animation={isRunning ? velocityAnimation : undefined}
      >
        {isRunning && (
          <Box
            className="inner"
            background={`url(${rocket}) no-repeat center bottom`}
            height={'100%'}
            transform={'translateY(100px)'}
            animation={flyingAnimation}
          ></Box>
        )}
      </Box>
    </Box>
  );
});
export default GameView;
