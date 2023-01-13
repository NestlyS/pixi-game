import { createContext, useContext } from "react";
import { Body } from 'matter-js';
import { CleanEventListener } from "./typing";
import { plug } from "../../utils/plug";

type BodyState = {
  x: number,
  vx: number,
  y: number,
  vy: number,
  rotation: number,
}

const initialState = {
  x: 0,
  vx: 0,
  y: 0,
  vy: 0,
  rotation: 0,
}

const BodyStateContext = createContext<BodyState>(initialState);

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
  }
}

type BodyContextState = {
  body: Body | null,
  onCollision: (cb: CleanEventListener) => void,
  clearCollision: (cb: CleanEventListener) => void,
}

const bodyInitialState = {
  body: null,
  onCollision: plug,
  clearCollision: plug,
}

const BodyContext = createContext<BodyContextState>(bodyInitialState);
export const BodyContextProvider = BodyContext.Provider;

export const useBody = () => {
  const props = useContext(BodyContext);

  return {
    body: props?.body ?? null,
    onCollision: props?.onCollision ?? bodyInitialState.onCollision,
    clearCollision: props?.clearCollision ?? bodyInitialState.clearCollision,
  }
}