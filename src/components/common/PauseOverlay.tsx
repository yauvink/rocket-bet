import { useContext, useEffect, useState } from 'react';
import { Box, CircularProgress, Text, keyframes, useMediaQuery } from '@chakra-ui/react';
import { GameContext } from '../Game/GameProvider';
import { convertSecondsToScore } from '../../utils';

const PauseOverlay = () => {
  const [progress, setProgress] = useState(100);
  const GAME = useContext(GameContext);
  const [isLargerThan600] = useMediaQuery('(min-width: 600px)');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prog) => prog - 2);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const colors = keyframes`
  0% { color: red; }
  50% { color: white; }
  100% { color: red; }
`;
  const animation = `${colors} infinite 1s linear`;

  return (
    <Box
      background={'rgba(0,0,0,0.5)'}
      position={'absolute'}
      width={'100%'}
      height={'100%'}
      display="flex"
      pt='20vh'
      alignItems={'center'}
      flexDirection={'column'}
      color="white"
      fontWeight={700}
    >
      <CircularProgress
        color="#6cb820"
        value={progress}
        size="200px"
        thickness="3px"
        display={'flex'}
        justifyContent={'center'}
      >
        <Box position={'absolute'} top={'40px'} textAlign={'center'}>
          <Text fontSize={'80px'}>{Math.ceil(progress / 20)}</Text>
        </Box>
      </CircularProgress>
      <Text fontSize={'20px'}>Flight starts soon</Text>
      {GAME?.roundFinalTime && (
        <Box fontSize={isLargerThan600 ? '50px' : '30px'}>
          <Text as="span">Final score: </Text>
          <Text as="span" animation={animation}>
            {convertSecondsToScore(GAME?.roundFinalTime)}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default PauseOverlay;
