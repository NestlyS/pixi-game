import React, { useContext } from 'react';

const defaultValue = {
  x: 0,
  y: 0,
  height: 0,
  width: 0,
};

const PositionContext = React.createContext(defaultValue);

export const PositionContextProvider = PositionContext.Provider;
export const usePositionContext = () => {
  const { x, y, height, width } = useContext(PositionContext);

  return {
    x: x ?? defaultValue.x,
    y: y ?? defaultValue.y,
    height: height ?? defaultValue.height,
    width: width ?? defaultValue.width,
  };
};
