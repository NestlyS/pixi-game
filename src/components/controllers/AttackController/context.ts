import { createContext, useContext } from "react";

type AttackingState = boolean;

export const initialState: AttackingState = false

const AttackingContext = createContext(initialState);

export const AttackingContextProvider = AttackingContext.Provider;
export const useAttacking = () => {
  const isAttacking = useContext(AttackingContext);

  return isAttacking ?? initialState;
}