import { Container, DisplayObject, Filter, MaskData } from 'pixi.js';
import { Sprite } from '../../Sprite';
import { useCallback, useMemo, useState } from 'react';
import { COLOR_OVERLAY_FILTER_DARKER } from '../../../constants';

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
  onHoverOutOutside?: () => void;
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
  onHoverOutOutside,
  filters,
  mask = null,
}: Props) => {
  const [isHovered, setHover] = useState(false);

  const _onHover = useCallback(() => {
    onHover?.();
    setHover(true);
  }, [onHover]);

  const _onHoverOut = useCallback(() => {
    onHoverOut?.();
    setHover(false);
  }, [onHoverOut]);

  const _onHoverOutOutside = useCallback(() => {
    onHoverOutOutside?.();
    setHover(false);
  }, [onHoverOutOutside]);

  const _filters = useMemo(() => {
    const preFilters = [];
    if (isHovered) {
      preFilters.push(COLOR_OVERLAY_FILTER_DARKER);
    }
    if (filters) {
      preFilters.push(...filters);
    }
    if (!preFilters.length) {
      return null;
    }
    return preFilters;
  }, [isHovered, filters]);

  return (
    <Sprite
      x={x}
      y={y}
      onClick={onClick}
      onHover={_onHover}
      onHoverOut={_onHoverOut}
      onHoverOutOutside={_onHoverOutOutside}
      width={width}
      height={height}
      spritesheet={spritesheetUrl}
      textureUrl={textureUrl}
      pixelised={pixelised}
      filters={_filters}
      mask={mask}
      interactive
    />
  );
};
