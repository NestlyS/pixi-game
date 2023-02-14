import { createContext, useContext } from 'react';

type AttackingState = boolean;

export const initialState: AttackingState = false;

const AttackingContext = createContext(initialState);

export const AttackingContextProvider = AttackingContext.Provider;
export const useAttacking = () => {
  const isAttacking = useContext(AttackingContext);

  return isAttacking ?? initialState;
};

type State = {
  isAttack: boolean;
  onActionFinish: () => void;
};

const initialStateAttacking = {
  isAttack: false,
  onActionFinish: () => {},
};

const AttackingAnimationIContext = createContext<State>(initialStateAttacking);
export const AttackingAnimationProvider = AttackingAnimationIContext.Provider;
export const useAttackingAnimation = () => {
  const { isAttack, onActionFinish } = useContext(AttackingAnimationIContext);

  return {
    isAttack,
    onActionFinish,
  };
};
