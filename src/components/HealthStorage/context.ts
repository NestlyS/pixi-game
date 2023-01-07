import { createContext, useContext, useMemo } from 'react';

type HealthState = {
  healthMap: Map<number, number | null>;
  setHealth: (id: number, value: number) => void;
}

export const initialState = {
  healthMap: new Map(),
  setHealth: (id: number, value: number) => console.log(id),
}

// Внутри хранятся пары записей типа id -> колво хп или null, если нет ничего
const HealthContext = createContext<HealthState>(initialState);

export const HealthContextProvider = HealthContext.Provider;
export const useHealth = (id: number) => {
  const {
    healthMap,
    setHealth,
  } = useContext(HealthContext);

  const currentHealth = healthMap.get(id);

  return useMemo(() => ({
    setHealth: (value: number) => setHealth ? setHealth(id, value) : initialState.setHealth(id, value),
    currentHealth,
  }), [currentHealth, id, setHealth]);
}