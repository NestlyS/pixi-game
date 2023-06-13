import React, { useMemo } from 'react';
import { Sprite } from '../../../../components/Sprite';
import { Filters } from '../../../../constants';
import { Container } from '@pixi/react';
import { useSelector } from 'react-redux';
import {
  selectAppControllerHeight,
  selectAppControllerWidth,
} from '../../../../redux/appController/selectors';
import { CharNames } from '../../../../redux/novelPage/typings';

const SPRITE_HEIGHT = 150;
const POSE_ANCHOR = { x: 0.5, y: 0 };

const NAME_TO_FACE_COORDS_MAP: Record<CharNames, { x: number; y: number }> = {
  [CharNames.Eva]: {
    x: 0.019,
    y: 0.165,
  },
  [CharNames.Gnida]: {
    x: 0.024,
    y: 0.07,
  },
  [CharNames.Mary]: {
    x: 0.005,
    y: 0.182,
  },
  [CharNames.GnidaHide]: {
    x: 0.024,
    y: 0.07,
  },
  [CharNames.Ernest]: {
    x: 0.0145,
    y: 0.165,
  },
  [CharNames.Milen]: {
    x: 0.034,
    y: 0.11,
  },
  [CharNames.MilenHide]: {
    x: 0.034,
    y: 0.11,
  },
};

type Props = {
  x: number;
  y: number;
  charName: CharNames;
  faceTextureName: string;
  poseTextureName: string;
  spritesheet: string;
  reverted?: boolean;
  isActive: boolean;
};

export const NovelCharacter = React.memo(
  ({
    charName,
    spritesheet,
    reverted,
    faceTextureName,
    poseTextureName,
    isActive,
    x,
    y,
  }: Props) => {
    const poseFilters = useMemo(
      () => [...(!isActive ? [Filters.COLOR_OVERLAY_FILTER_DARKER] : []), Filters.SHADOW_FILTER],
      [isActive],
    );
    const faceFilters = useMemo(
      () => (!isActive ? [Filters.COLOR_OVERLAY_FILTER_DARKER] : []),
      [isActive],
    );
    const height = useSelector(selectAppControllerHeight);
    const width = useSelector(selectAppControllerWidth);
    const scale = useMemo(() => {
      const calcMult = (height / SPRITE_HEIGHT) * 1.3;

      return {
        x: (reverted ? -1 : 1) * calcMult,
        y: calcMult,
      };
    }, [height, reverted]);

    return (
      <Container x={x} y={y + (!isActive ? height * 0.1 : 0)}>
        <Sprite
          x={0}
          y={0}
          scale={scale}
          textureUrl={`${poseTextureName}.png`}
          spritesheet={spritesheet}
          filters={poseFilters}
          anchor={POSE_ANCHOR}
        />
        <Sprite
          x={width * (NAME_TO_FACE_COORDS_MAP[charName]?.x ?? 0)}
          y={height * (NAME_TO_FACE_COORDS_MAP[charName]?.y ?? 0)}
          scale={scale}
          textureUrl={`${faceTextureName}.png`}
          spritesheet={spritesheet}
          anchor={POSE_ANCHOR}
          filters={faceFilters}
        />
      </Container>
    );
  },
);
