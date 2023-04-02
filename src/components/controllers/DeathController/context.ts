import { Body } from 'matter-js';
import { createContext, useContext } from 'react';

export type KillDispatcher = (body?: Body) => void;
const initialState: KillDispatcher = () => {};

const DeathWrapperContext = createContext<KillDispatcher>(initialState);
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
