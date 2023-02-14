import { createContext, useContext } from 'react';

const initialState = () => {};

const DeathWrapperContext = createContext(initialState);
export const DeathWrapperContextProvider = DeathWrapperContext.Provider;
export const useDeathWrapper = () => {
  const kill = useContext(DeathWrapperContext);

  return kill;
};

const listenerInitialState = false;
const DeathListenerContext = createContext(listenerInitialState);
export const DeathListenerContextProvider = DeathListenerContext.Provider;
export const useDeath = () => {
  const isDead = useContext(DeathListenerContext);

  return isDead;
};
