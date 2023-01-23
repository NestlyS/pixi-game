import { useCallback, useRef } from "react";
import { memo, useMemo, useState } from "react";
import { HealthContextProvider, initialState } from "./context";
import { CooldownState, HealthSetter, IdType, OnCooldownCallback, OnCooldownListener } from "./typings";

type Props = {
  children: React.ReactNode
}

const initCooldown = (cooldownState: CooldownState, id: IdType, cooldownTimeout: number = 0) => {
  cooldownState[id] = { isCooldown: false,  cooldownTimeout, listeners: [] };
}

// Вынести логику кулдауна в HealthStorage, чтобы обрабатывать нанесение урона корректно
export const HealthStorage = memo(({
  children
}: Props) => {
  const [healthState, updateHealthState] = useState(initialState.healthMap);
  const cooldownStateRef = useRef<CooldownState>({});

  const setHealth = useCallback<HealthSetter>((id, value, cooldownTimeout = 0) => updateHealthState(state => {
    if (!cooldownStateRef.current[id]) initCooldown(cooldownStateRef.current, id, cooldownTimeout);
    if (cooldownTimeout && cooldownStateRef.current[id].cooldownTimeout !== cooldownTimeout) cooldownStateRef.current[id].cooldownTimeout = cooldownTimeout;
    if (state[id] === undefined && typeof value === 'function') throw new Error("Health is not settled. Nothing to throw to function");

    const currentValue = typeof value === 'function' ? value(state[id]) : value;
    const prevValue = state[id];

    if (cooldownStateRef.current[id]?.isCooldown) return state;

    if (prevValue && currentValue && currentValue < prevValue && cooldownStateRef.current[id]?.cooldownTimeout) {
      cooldownStateRef.current[id].isCooldown = true;
      cooldownStateRef.current[id].listeners.forEach(cb => cb(cooldownStateRef.current[id].isCooldown));
      setTimeout(() => {
        cooldownStateRef.current[id].isCooldown = false;
        cooldownStateRef.current[id].listeners.forEach(cb => cb(cooldownStateRef.current[id].isCooldown));
      }, cooldownStateRef.current[id].cooldownTimeout)
    }

    return {...state, [id]: currentValue};
  }), []);

  const onCooldown = useCallback<OnCooldownListener>((id, cb) => {
    if (!cooldownStateRef.current[id]) initCooldown(cooldownStateRef.current, id);
    cooldownStateRef.current[id].listeners.push(cb);
  }, []);

  const removeCooldown = useCallback<OnCooldownListener>((id, cb) => {
    if (!cooldownStateRef.current[id]) initCooldown(cooldownStateRef.current, id);
    cooldownStateRef.current[id].listeners.filter(_cb => _cb !== cb);
  }, []);

  const value = useMemo(() => ({
    healthMap: healthState,
    setHealth,
    onCooldown,
    removeCooldown,
  }), [removeCooldown, healthState, onCooldown, setHealth]);

  return (
    <HealthContextProvider value={value}>
      { children }
    </HealthContextProvider>
  )
});