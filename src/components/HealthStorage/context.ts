import { createContext, useCallback, useContext, useMemo } from 'react';
import { FuncValueType, HealthState, IdType, ValueType } from './typings';

export const initialState: HealthState = {
  healthMap: {},
  setHealth: (id, value) => console.log(id, value),
  onCooldown: (id, cb) => console.log(id, cb),
  removeCooldown: (id, cb) => console.log(id, cb),
};

// Внутри хранятся пары записей типа id -> колво хп или null, если нет ничего
const HealthContext = createContext<HealthState>(initialState);

export const HealthContextProvider = HealthContext.Provider;
export const useHealth = (id?: IdType | null) => {
  const { healthMap, setHealth, onCooldown, removeCooldown } = useContext(HealthContext);

  const currentHealth = id ? healthMap[id] : null;

  const setCurrentHealth = useCallback(
    (value: ValueType | FuncValueType, _id?: IdType, cooldownTimeout?: number) => {
      const innerId = id || _id;
      console.log(_id, id, value, cooldownTimeout);

      if (!innerId) throw new Error(`id не представлен: val: ${value} id: ${innerId}`);
      if (!setHealth) return initialState.setHealth(innerId, value, cooldownTimeout);

      return setHealth(innerId, value, cooldownTimeout);
    },
    [id, setHealth],
  );

  const onCurrentHealthCooldown = useCallback(
    (cb: (cooldown: boolean) => void, _id?: IdType) => {
      const innerId = id || _id;
      console.log(_id, id, cb);

      if (!innerId) throw new Error('id не представлен');
      if (!onCooldown) return initialState.onCooldown(innerId, cb);

      return onCooldown(innerId, cb);
    },
    [id, onCooldown],
  );

  const clearCurrentHealthCooldown = useCallback(
    (cb: (cooldown: boolean) => void, _id?: IdType) => {
      const innerId = id || _id;
      console.log(_id, id, cb);

      if (!innerId) throw new Error('id не представлен');
      if (!removeCooldown) return initialState.removeCooldown(innerId, cb);

      return removeCooldown(innerId, cb);
    },
    [id, removeCooldown],
  );

  return useMemo(
    () => ({
      setHealth: setCurrentHealth,
      onCooldown: onCurrentHealthCooldown,
      clearCooldown: clearCurrentHealthCooldown,
      currentHealth,
    }),
    [clearCurrentHealthCooldown, currentHealth, onCurrentHealthCooldown, setCurrentHealth],
  );
};
