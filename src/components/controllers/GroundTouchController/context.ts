import { createContext, useContext, useEffect } from 'react';

type GroundTouchState = {
  isGroundTouched: boolean;
};

export const initialState: GroundTouchState = {
  isGroundTouched: false,
};

const GroundTouchContext = createContext(initialState);

export const GroundTouchContextProvider = GroundTouchContext.Provider;
export const useGroundTouch = (onChange?: (isGroundTouched: boolean) => void) => {
  const { isGroundTouched } = useContext(GroundTouchContext);

  useEffect(() => {
    console.log('CHANGED');
    onChange?.(isGroundTouched);
  }, [isGroundTouched, onChange]);
};
