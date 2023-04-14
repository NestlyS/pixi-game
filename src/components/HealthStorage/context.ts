import { createContext, useCallback, useContext, useMemo } from 'react';
import { Body } from 'matter-js';
import { FuncValueType, HealthState, IdType, ValueType } from './typings';
import { getBodyId } from './utils';

export const initialState: HealthState = {
  healthMap: {},
  setHealth: (id, value) => console.log(id, value),
  onCooldown: (id, cb) => console.log(id, cb),
  removeCooldown: (id, cb) => console.log(id, cb),
};

// Внутри хранятся пары записей типа id -> колво хп или null, если нет ничего
const HealthContext = createContext<HealthState>(initialState);

export const HealthContextProvider = HealthContext.Provider;
export const useHealth = (id?: IdType | Body | null) => {
  const { healthMap, setHealth, onCooldown, removeCooldown } = useContext(HealthContext);

  const currentId = id
    ? typeof id === 'string' || typeof id === 'number'
      ? id
      : getBodyId(id)
    : null;

  const currentHealth = currentId ? healthMap[currentId] : null;

  const setCurrentHealth = useCallback(
    (value: ValueType | FuncValueType, _id?: IdType | Body, cooldownTimeout?: number) => {
      const getId = () => {
        if (currentId) return currentId;
        if (!_id) throw new Error(`id не представлен: val: ${value} id: ${innerId}`);
        if (typeof _id === 'string' || typeof _id === 'number') return _id;
        return getBodyId(_id);
      };

      const innerId = getId();
      console.log(_id, currentId, value, cooldownTimeout);

      if (!setHealth) return initialState.setHealth(innerId, value, cooldownTimeout);

      return setHealth(innerId, value, cooldownTimeout);
    },
    [currentId, setHealth],
  );

  const onCurrentHealthCooldown = useCallback(
    (cb: (cooldown: boolean) => void, _id?: IdType) => {
      const innerId = currentId || _id;
      console.log(_id, currentId, cb);

      if (!innerId) throw new Error('id не представлен');
      if (!onCooldown) return initialState.onCooldown(innerId, cb);

      return onCooldown(innerId, cb);
    },
    [currentId, onCooldown],
  );

  const clearCurrentHealthCooldown = useCallback(
    (cb: (cooldown: boolean) => void, _id?: IdType) => {
      const innerId = currentId || _id;
      console.log(_id, currentId, cb);

      if (!innerId) throw new Error('id не представлен');
      if (!removeCooldown) return initialState.removeCooldown(innerId, cb);

      return removeCooldown(innerId, cb);
    },
    [currentId, removeCooldown],
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
