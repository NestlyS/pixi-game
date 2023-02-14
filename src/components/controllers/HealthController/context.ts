import { createContext, useContext } from 'react';

type State = {
  isCooldown: boolean;
  currentHealth: number | null;
  addHealth: null | ((amount: number) => void);
  makeDamage?: null | ((amount: number) => void);
};

const initialState: State = {
  isCooldown: false,
  currentHealth: null,
  addHealth: null,
  makeDamage: null,
};

const BodyHealthContext = createContext(initialState);
export const BodyHealthContextProvider = BodyHealthContext.Provider;
export const useBodyHealth = () => {
  const { isCooldown, currentHealth, addHealth, makeDamage } = useContext(BodyHealthContext);

  return {
    isCooldown,
    currentHealth,
    addHealth,
    makeDamage,
  };
};
