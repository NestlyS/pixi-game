import { createContext, useContext } from 'react';

const initialState = false;

const TutorialContext = createContext(initialState);

export const TutorialContextProvider = TutorialContext.Provider;
export const useTutorialContext = () => {
  const isTutorial = useContext(TutorialContext);
  return isTutorial ?? initialState;
};
