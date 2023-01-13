import { useCallback } from "react";
import { memo, useMemo, useState } from "react";
import { HealthContextProvider, initialState } from "./context";

type Props = {
  children: React.ReactNode
}

export const HealthStorage = memo(({
  children
}: Props) => {
  const [healthState, updateHealthState] = useState(initialState.healthMap);

  const setHealth = useCallback((id: number, value: number | null | ((value: number | null) => number | null)) => updateHealthState(state => {
    if (typeof value === 'function') {
      const calc = value(state[id]);
      return {...state, [id]: calc};
    }

    return {...state, [id]: value};
  }), []);

  const value = useMemo(() => ({
    healthMap: healthState,
    setHealth
  }), [healthState, setHealth]);

  return (
    <HealthContextProvider value={value}>
      { children }
    </HealthContextProvider>
  )
});