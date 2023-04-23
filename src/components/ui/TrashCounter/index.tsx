import React from 'react';
import { useSelector } from 'react-redux';
import {
  BOTTLE_TEXTURE,
  CHIPS_TEXTURE,
  PAPER_TEXTURE,
  PIXEL_FONT_GREEN,
  PIXEL_FONT_WHITE,
  PIXEL_FONT_YELLOW,
} from '../../../constants';
import { selectMainUserId, selectMainUserTrash } from '../../../redux/mainUser/selectors';
import { TrashCount } from './TrashCount';
import { TrashTypes } from '../../../redux/mainUser/typings';

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
  const trash = useSelector(selectMainUserTrash);
  const id = useSelector(selectMainUserId);

  if (!id) return null;

  return (
    <>
      {TEXTURE_URLS.map((textureUrl, index) => (
        <TrashCount
          key={index}
          x={x + (width * 2 + pad * 2) * index}
          y={y}
          width={width}
          height={height}
          spritesheetUrl={spritesheetUrl}
          textureUrl={textureUrl}
          fontStyle={FONTS[index]}
          count={trash[TRASH_TYPES[index]]}
        />
      ))}
    </>
  );
};
