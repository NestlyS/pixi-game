import { Container, DisplayObject, MaskData } from 'pixi.js';
import React from 'react';
import { UIContainer } from '../../../UIContrainer';
import { COLORS, Filters } from '../../../../../constants';
import { Sprite } from '../../../../Sprite';

export enum BackgroundTypes {
  Sprite = 'sprite',
  Graphic = 'graphic',
}

export type Props = {
  type: BackgroundTypes;
  width: number;
  height: number;
  filters?: Filters[];
  mask?: Container<DisplayObject> | MaskData | null;
  onClick?: () => void;
  onHover?: () => void;
  onHoverOut?: () => void;
  onHoverOutOutside?: () => void;
  backgroundColor?: COLORS;
  outlineColor?: COLORS;
  borderRadius?: number;
  spritesheetUrl?: string;
  textureUrl?: string;
  pixelised?: boolean;
  noBackground?: boolean;
};

export const ButtonBackground = React.memo(
  ({
    type,
    backgroundColor,
    outlineColor,
    borderRadius,
    spritesheetUrl,
    textureUrl = '',
    filters,
    mask,
    width,
    height,
    noBackground = false,
    onClick,
    onHover,
    onHoverOut,
    onHoverOutOutside,
  }: Props) => {
    switch (type) {
      case BackgroundTypes.Graphic:
        return (
          <UIContainer
            x={0}
            y={0}
            filters={filters}
            backgroundColor={backgroundColor}
            outlineColor={outlineColor}
            borderRadius={borderRadius}
            width={width}
            height={height}
            onClick={onClick}
            onHover={onHover}
            onHoverOut={onHoverOut}
            onHoverOutOutside={onHoverOutOutside}
            noBackground={noBackground}
          />
        );

      case BackgroundTypes.Sprite:
      default:
        return (
          <Sprite
            x={0}
            y={0}
            onClick={onClick}
            onHover={onHover}
            onHoverOut={onHoverOut}
            onHoverOutOutside={onHoverOutOutside}
            width={width}
            height={height}
            filters={filters}
            textureUrl={textureUrl}
            spritesheet={spritesheetUrl}
            mask={mask}
            interactive
          />
        );
    }
  },
);
