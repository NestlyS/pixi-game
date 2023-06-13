import { ControllableBody } from '../../../../components/Controllable';
import { Grass } from '../../../../components/TileGround/components/Grass/Grass';
import { GAME_SPRITESHEET_URL, TILE_SIZE } from '../../../../constants';

const ROWS_WIDTH = 18;
const ROWS_HEIGHT = 2;

type Props = {
  rightEdgeX: number;
  y: number;
};

export const DefaultStartPlatform = ({ rightEdgeX, y }: Props) => {
  return (
    <>
      <Grass
        x={rightEdgeX - (ROWS_WIDTH * TILE_SIZE) / 2}
        y={y}
        tilesWidth={ROWS_WIDTH}
        tilesHeight={ROWS_HEIGHT}
        tileSize={TILE_SIZE}
        spritesheetUrl={GAME_SPRITESHEET_URL}
      />
      <ControllableBody x={rightEdgeX - ROWS_WIDTH * TILE_SIZE * 0.75} y={y - 200} />
    </>
  );
};
