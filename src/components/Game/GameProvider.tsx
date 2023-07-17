import { useState, ReactNode, createContext, FC, useEffect } from 'react';

import { GameContextType, type GameStateType, GameState } from '../../types';

type Props = { children: ReactNode };

export const GameContext = createContext<GameContextType | null>(null);

export const GameProvider: FC<Props> = ({ children }) => {
  const PAUSE_INTERVAL = 5000;
  const MAX_ROUND_TIME = 12000;
  const [state, setState] = useState<GameStateType>(GameState.WAITING);
  const [roundStartDate, setRoundStartDate] = useState<number | null>(null);
  const [roundFinalTime, setRoundFinalTime] = useState<number | null>(null);

  function startGame() {
    const runTimerOn = () => {
      console.log('GAME STOPED FOR', PAUSE_INTERVAL, 'MILISECONDS');
      setTimeout(() => {
        setState(GameState.IN_PROCESS);
        setRoundStartDate(Date.now());
        runTimerOff();
      }, PAUSE_INTERVAL);
    };

    const runTimerOff = () => {
      const randomTime = Math.round(Math.random() * MAX_ROUND_TIME);
      console.log('GAME STARTED FOR ', randomTime, ' MILISECONDS');
      setTimeout(() => {
        setState(GameState.WAITING);
        setRoundFinalTime(randomTime);
        runTimerOn();
      }, randomTime);
    };

    runTimerOn();
  }

  useEffect(() => {
    console.log('--=== Game started ===--');
    startGame();
  }, []);

  return (
    <GameContext.Provider value={{ state, roundStartDate, roundFinalTime, startGame }}>{children}</GameContext.Provider>
  );
};
