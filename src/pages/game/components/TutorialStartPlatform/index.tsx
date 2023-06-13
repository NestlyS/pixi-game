import { useCallback, useRef } from 'react';
import { EasyMonstersRow } from '../../../../components/Chunk/components/EasyMonstersRow';
import { Row } from '../../../../components/Chunk/components/Row';
import { TrashRowChunk } from '../../../../components/Chunk/components/TrashRowChunk';
import { ControllableBody } from '../../../../components/Controllable';
import { GAME_SPRITESHEET_URL, TILE_SIZE } from '../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setNovel, setGamePage, setPause } from '../../../../redux/gamePage';
import { Pages } from '../../../../redux/gamePage/typings';
import { TutorialContextProvider } from './context';
import { TutorialCrack } from '../../../../components/Chunk/components/TutorialCrack';
import { GnidaChunk } from '../../../../components/Chunk/components/GnidaChunk';
import { selectPageGameCurrentPage } from '../../../../redux/gamePage/selectors';
import { Dialogs } from '../../../../redux/novelPage/typings';
import { Container } from '@pixi/react';

const ROWS_WIDTH = 8;
const ROWS_HEIGHT = 2;

type Props = {
  rightEdgeX: number;
  y: number;
};

export const TutorialStartPlatform = ({ y, rightEdgeX }: Props) => {
  const page = useSelector(selectPageGameCurrentPage);
  const cbRef = useRef<(() => void) | null>(null);
  const dispatch = useDispatch();

  if (page === Pages.Main && cbRef.current !== null) {
    cbRef.current();
    cbRef.current = null;
  }

  const onFirstCollision = useCallback(() => {
    dispatch(setPause());
    dispatch(setGamePage(Pages.TutorialAttack));
  }, [dispatch]);

  const onSecondCollision = useCallback(() => {
    dispatch(setPause());
    dispatch(setGamePage(Pages.TutorialJump));
  }, [dispatch]);

  const onThirdCollision = useCallback(
    (cb: () => void) => {
      dispatch(setPause());
      dispatch(setNovel(Dialogs.Gnida));
      dispatch(setGamePage(Pages.Novel));
      cbRef.current = cb;
    },
    [dispatch],
  );

  return (
    <TutorialContextProvider value={true}>
      <Container sortableChildren>
        <Row
          spritesheetUrl={GAME_SPRITESHEET_URL}
          width={ROWS_WIDTH}
          tileSize={TILE_SIZE}
          tilesHeight={ROWS_HEIGHT}
          x={rightEdgeX - ROWS_WIDTH * TILE_SIZE * 5.5}
          y={y}
          zIndex={10}
        />
        <EasyMonstersRow
          spritesheetUrl={GAME_SPRITESHEET_URL}
          width={ROWS_WIDTH}
          tileSize={TILE_SIZE}
          tilesHeight={ROWS_HEIGHT}
          x={rightEdgeX - ROWS_WIDTH * TILE_SIZE * 4.5}
          y={y}
          onCollision={onFirstCollision}
          zIndex={9}
        />
        <TrashRowChunk
          spritesheetUrl={GAME_SPRITESHEET_URL}
          width={ROWS_WIDTH}
          tileSize={TILE_SIZE}
          tilesHeight={ROWS_HEIGHT}
          x={rightEdgeX - ROWS_WIDTH * TILE_SIZE * 3.5}
          y={y}
          zIndex={8}
        />
        <TutorialCrack
          spritesheetUrl={GAME_SPRITESHEET_URL}
          width={ROWS_WIDTH}
          tileSize={TILE_SIZE}
          tilesHeight={ROWS_HEIGHT}
          x={rightEdgeX - ROWS_WIDTH * TILE_SIZE * 2.5}
          y={y}
          onCollision={onSecondCollision}
          zIndex={7}
        />
        <Row
          spritesheetUrl={GAME_SPRITESHEET_URL}
          width={ROWS_WIDTH / 2}
          tileSize={TILE_SIZE}
          tilesHeight={ROWS_HEIGHT}
          x={rightEdgeX - ROWS_WIDTH * TILE_SIZE * 1.5}
          y={y}
          zIndex={6}
        />
        <GnidaChunk
          x={rightEdgeX - ROWS_WIDTH * TILE_SIZE}
          y={y}
          width={ROWS_WIDTH}
          tileSize={TILE_SIZE}
          tilesHeight={ROWS_HEIGHT}
          spritesheetUrl={GAME_SPRITESHEET_URL}
          onCollision={onThirdCollision}
          zIndex={5}
        />
        <ControllableBody
          x={rightEdgeX - ROWS_WIDTH * TILE_SIZE - ROWS_WIDTH * TILE_SIZE * 4}
          y={y - 200}
        />
      </Container>
    </TutorialContextProvider>
  );
};
