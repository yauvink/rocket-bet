import { useState, useEffect } from "react";
import { GameContextType } from "../types";

const useTimer = (GAME: GameContextType | null) => {
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    if (GAME && GAME.roundStartDate) {
      const START_DATE = GAME.roundStartDate;
      const interval = setInterval(() => {
        setTimer(Date.now() - START_DATE);
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [GAME, GAME?.roundStartDate]);

  return [timer]

};

export default useTimer;
