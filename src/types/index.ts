type ValyeOf<T> = T[keyof T];

export const GameState = {
  IN_PROCESS: 'in_process',
  WAITING: 'waiting'
} as const;

export type GameStateType = ValyeOf<typeof GameState>

export type GameContextType = {
  state: GameStateType;
  roundStartDate: number | null;
  roundFinalTime: number | null;
  startGame: () => void;
};
