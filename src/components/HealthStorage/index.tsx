import { useMemo, useState } from "react";
import { HealthContextProvider, initialState } from "./context";

type Props = {
  children: React.ReactNode
}

export const HealthStorage = ({
  children
}: Props) => {
  const [healthState, updateHealthState] = useState(initialState.healthMap);

  const value = useMemo(() => ({
    healthMap: healthState,
    setHealth: (id: number, value: number) => updateHealthState(state => {
      state.set(id, value);
      return state;
    })
  }), []);

  return (
    <HealthContextProvider value={value}>
      { children }
    </HealthContextProvider>
  )
}