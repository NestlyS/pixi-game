import { forwardRef } from "react";
import { Graphics as PIXI_Grapics } from "pixi.js";
import { useBodyParams } from "../../Body/context";
import { Rectangle } from "../../Rectangle";

type Props = {
  width: number
  height: number
}

export const RectangleController = forwardRef<PIXI_Grapics, Props>(({
  width,
  height,
}, ref) => {
  const {
    x,
    y,
    rotation,
  } = useBodyParams();

  return <Rectangle ref={ref} x={x} y={y} rotation={rotation} width={width} height={height} lineWidth={2} color={0}/>
})