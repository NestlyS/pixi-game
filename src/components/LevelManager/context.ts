import { createContext, useContext } from 'react';

type LevelManagerContextState = {
  setLastBlockOffset: (yOffset: number) => void;
};

const initialState: LevelManagerContextState = {
  setLastBlockOffset: (yOffset) => console.log(yOffset),
};

const LevelManagerContext = createContext<LevelManagerContextState>(initialState);

export const LevelManagerContextProvider = LevelManagerContext.Provider;

export const useLevelManager = () => {
  const { setLastBlockOffset } = useContext(LevelManagerContext);

  return {
    setLastBlockOffset: setLastBlockOffset ?? initialState.setLastBlockOffset,
  };
};
