import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Input, Text, useMediaQuery } from '@chakra-ui/react';

import useTimer from '../../../hooks/useTimer';
import { GameState } from '../../../types';
import { CoinIcon } from '../../common/CoinIcon';
import { GameContext } from '../GameProvider';

const UserControls = React.memo(() => {
  const GAME = useContext(GameContext);
  const [betInputValue, setBetInputValue] = useState<number>(0);
  const [userBalance, setUserBalance] = useState<number>(1000);
  const [isBetForNexRound, setBetForNexRound] = useState<boolean>(false);
  const [timer] = useTimer(GAME);
  const [bet, setBet] = useState<number | null>(null);
  const [isLargerThan600] = useMediaQuery('(min-width: 600px)');
  const betValues = [10, 20, 50, 100];
  const btnWidth = isLargerThan600 ? '200px' : '150px';

  useEffect(() => {
    if (GAME?.state === GameState.IN_PROCESS && bet) {
      setUserBalance((balance) => balance - bet);
    } else {
      if (!isBetForNexRound) {
        setBet(null);
      } else {
        setBetForNexRound(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GAME?.state]);

  const cashOut = () => {
    if (GAME?.state === GameState.IN_PROCESS && bet !== null && GAME.roundStartDate) {
      const stopTime = Date.now();
      const rate = stopTime - GAME.roundStartDate;
      const winAmount = (bet * rate) / 1000;
      setUserBalance((balance) => balance + winAmount);
      setBet(null);
    }
  };

  return (
    <>
      <Box fontSize={'20px'} color={'white'} position={'fixed'} top={'10px'} right={'10px'}>
        Your balance: <CoinIcon />
        {userBalance}
      </Box>
      <Box
        position={'fixed'}
        bottom={'20px'}
        left="50%"
        transform={'translateX(-50%)'}
        zIndex={999}
        textAlign={'center'}
        color="white"
        width={'100%'}
        maxW={'600px'}
        p="0 20px"
      >
        {bet !== null && (
          <Text textShadow={'2px 2px #000000'} fontSize={'25px'}>
            {' '}
            Your bet for next round: {bet}
          </Text>
        )}
        <Box border={'1px solid grey'} background={'#362844'} p="20px" borderRadius={15}>
          <Box
            m={'10px'}
            flexWrap={'wrap'}
            justifyContent={'center'}
            display={'flex'}
            gap={'10px'}
            alignItems={'center'}
          >
            <CoinIcon />
            <Input
              textAlign={'center'}
              background={'#191225'}
              border={'none'}
              width={'100px'}
              style={{ padding: '10px', fontSize: '20px' }}
              type="number"
              value={betInputValue}
              onChange={(e) => {
                setBetInputValue(Number(e.target.value));
              }}
            />

            {bet !== null && !(GAME?.state === GameState.IN_PROCESS && !isBetForNexRound) && (
              <Button
                width={btnWidth}
                backgroundColor="#F3622D"
                background={'red'}
                color="white"
                onClick={() => {
                  setBet(null);
                  setBetInputValue(0);
                }}
              >
                Cancel
              </Button>
            )}
            {bet === null && (
              <Button
                backgroundColor="#2E72FD"
                color={'white'}
                width={btnWidth}
                onClick={() => {
                  if (betInputValue > 0 && betInputValue < userBalance) {
                    setBet(betInputValue);
                    if (GAME?.state === GameState.IN_PROCESS) {
                      setBetForNexRound(true);
                    }
                  }
                }}
              >
                Place bet
              </Button>
            )}
            {bet !== null && GAME?.state === GameState.IN_PROCESS && !isBetForNexRound && (
              <Button backgroundColor="#5AAD26" onClick={cashOut} width={btnWidth} color={'white'}>
                Cash out {Math.round((timer! * bet) / 1000)}
              </Button>
            )}
          </Box>
          <Box display={'flex'} justifyContent={'space-around'} flexWrap={'wrap'}>
            {betValues.map((value) => (
              <Button
                key={value}
                backgroundColor="#614C6D"
                borderRadius="20px"
                width={isLargerThan600 ? '100px' : '50px'}
                color="white"
                onClick={() => {
                  setBetInputValue(value);
                }}
              >
                {value}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
});

export default UserControls;
