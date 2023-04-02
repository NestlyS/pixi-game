import { createContext, useContext } from 'react';

type State = {
  isCooldown: boolean;
  currentHealth: number | null;
};

const initialState: State = {
  isCooldown: false,
  currentHealth: null,
};

const BodyHealthContext = createContext(initialState);
export const BodyHealthContextProvider = BodyHealthContext.Provider;
export const useBodyHealth = () => {
  const { isCooldown, currentHealth } = useContext(BodyHealthContext);

  return {
    isCooldown,
    currentHealth,
  };
};
