import { Container, DisplayObject, Filter, MaskData } from 'pixi.js';
import { Sprite } from '../../Sprite';

export type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  spritesheetUrl: string;
  textureUrl: string;
  pixelised?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  onHoverOut?: () => void;
  filters?: Filter[];
  mask?: Container<DisplayObject> | MaskData | null;
};

export const Button = ({
  x,
  y,
  width,
  height,
  spritesheetUrl,
  textureUrl,
  pixelised = false,
  onClick,
  onHover,
  onHoverOut,
  filters,
  mask
}: Props) => (
  <Sprite
    x={x}
    y={y}
    onClick={onClick}
    onHover={onHover}
    onHoverOut={onHoverOut}
    width={width}
    height={height}
    spritesheet={spritesheetUrl}
    textureUrl={textureUrl}
    pixelised={pixelised}
    filters={filters}
    mask={mask}
  />
);
