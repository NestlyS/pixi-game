import React, { useContext } from "react";
import { Body as Matter_Body } from 'matter-js';

type BodyState = {
  x: number,
  vx: number,
  y: number,
  vy: number,
  rotation: number,
  body: Matter_Body | null,
}

const initialState = {
  x: 0,
  vx: 0,
  y: 0,
  vy: 0,
  rotation: 0,
  body: null,
}

const BodyStateContext = React.createContext<BodyState>(initialState);

export const BodyStateContextProvider = BodyStateContext.Provider;
export const BodyStateContextConsumer = BodyStateContext.Consumer;

export const useBodyParams = () => {
  const props = useContext(BodyStateContext);

  return {
    x: Number(props?.x.toFixed(2)) ?? 0,
    vx: Number(props?.vx.toFixed(2)) ?? 0,
    y: Number(props?.y.toFixed(2)) ?? 0,
    vy: Number(props?.vy.toFixed(2)) ?? 0,
    rotation: props?.rotation ?? 0,
    body: props?.body ?? null
  }
}