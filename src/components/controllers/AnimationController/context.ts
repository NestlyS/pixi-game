import { createContext, useContext } from 'react';

export enum AnimationList {
  Idle = 'idle',
  Run = 'run',
  Fall = 'fall',
  Jump = 'jump',
  Hurt = 'hurt',
  Slide = 'slide',
  Attack = 'attack',
  Die = 'die',
  Heal = 'heal',
}

export type RequestAnimationType = (props: {
  name: AnimationList;
  onFinish?: (animationName: string | null, isLoop: boolean) => void;
}) => void;

export type ReleaseAnimationType = (name: AnimationList) => void;

export type AnimationState = {
  requestAnimation: RequestAnimationType;
  releaseAnimation: ReleaseAnimationType;
};

export const initialState: AnimationState = {
  requestAnimation: () => {},
  releaseAnimation: () => {},
};

const AnimationControllerContext = createContext(initialState);
export const AnimationControllerProvider = AnimationControllerContext.Provider;
export const useAnimationController = () => {
  const { requestAnimation, releaseAnimation } = useContext(AnimationControllerContext);

  return {
    requestAnimation: requestAnimation ?? initialState.requestAnimation,
    releaseAnimation: releaseAnimation ?? initialState.releaseAnimation,
  };
};
