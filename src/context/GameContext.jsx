import { createContext, useState } from "react";

const defaultState = {
  difficulty: 0,
  gamesPlayed: [],
};

export const GameContext = createContext(defaultState);

export const GameProvider = ({ children }) => {
  const difficulty = useState(0);
  const gamesPlayed = useState([]);

  return (
    <GameContext.Provider
      value={{
        difficulty,
        gamesPlayed,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
