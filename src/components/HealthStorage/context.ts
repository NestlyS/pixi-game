import { createContext, useCallback, useContext, useMemo } from 'react';

type HealthState = {
  healthMap: Record<number, number | null>;
  setHealth: (id: number, value: number | null | ((value: number | null) => number | null)) => void;
}

export const initialState: HealthState = {
  healthMap: {},
  setHealth: (id, value) => console.log(id, value),
}

// Внутри хранятся пары записей типа id -> колво хп или null, если нет ничего
const HealthContext = createContext<HealthState>(initialState);

export const HealthContextProvider = HealthContext.Provider;
export const useHealth = (id?: number) => {
  const {
    healthMap,
    setHealth,
  } = useContext(HealthContext);

  const currentHealth = id ? healthMap[id] : null;

  const setCurrentHealth = useCallback((value: number | null | ((value: number | null) => number | null), _id?: number) => {
    const innerId = id || _id;
    console.log(_id, id, value);

    if (!innerId) return initialState.setHealth;

    return setHealth(innerId, value);
  }, [id, setHealth]);

  return useMemo(() => ({
    setHealth: setCurrentHealth,
    currentHealth,
  }), [currentHealth, setCurrentHealth])
}