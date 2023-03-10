import React, { useEffect, useState } from 'react';
import { Text } from '@inlet/react-pixi';
import {
  BOTTLE_TEXTURE,
  CHIPS_TEXTURE,
  PAPER_TEXTURE,
  PIXEL_FONT_GREEN,
  PIXEL_FONT_WHITE,
  PIXEL_FONT_YELLOW,
} from '../../../constants';
import { Sprite } from '../../Sprite';
import { useTrash } from '../../TrashStorage/context';
import { TrashTypes } from '../../TrashStorage/typings';
import { useMainUserId } from '../../MainUserStorage/context';
import { TrashCount } from './TrashCount';

const TEXTURE_URLS = [BOTTLE_TEXTURE, CHIPS_TEXTURE, PAPER_TEXTURE];
const TRASH_TYPES: TrashTypes[] = ['bottle', 'chips', 'paper'];
const FONTS = [PIXEL_FONT_GREEN, PIXEL_FONT_YELLOW, PIXEL_FONT_WHITE];

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  pad: number;
  spritesheetUrl: string;
};

export const TrashCounter = ({ x, y, width, height, pad, spritesheetUrl }: Props) => {
  const { onChange, clearOnChange } = useTrash();
  const { id } = useMainUserId();
  const [counters, setCounters] = useState(
    TRASH_TYPES.reduce((acc, type) => {
      acc[type] = 0;
      return acc;
    }, {} as Record<TrashTypes, number>),
  );
  useEffect(() => {
    if (!id) return;

    const cb = (type: TrashTypes, value: number) => {
      setCounters((_counters) => {
        const newCounters = { ..._counters };
        newCounters[type] = value;
        return newCounters;
      });
    };

    TRASH_TYPES.forEach((type) => onChange(id, type, cb));

    return () => TRASH_TYPES.forEach((type) => clearOnChange(id, type, cb));
  }, [clearOnChange, id, onChange]);

  if (!id) return null;

  return (
    <>
      {TEXTURE_URLS.map((textureUrl, index) => (
        <TrashCount
          key={index}
          x={x + (width * 2 + pad * 6) * index}
          y={y}
          width={width}
          height={height}
          spritesheetUrl={spritesheetUrl}
          textureUrl={textureUrl}
          fontStyle={FONTS[index]}
          count={counters[TRASH_TYPES[index]]}
        />
      ))}
    </>
  );
};
