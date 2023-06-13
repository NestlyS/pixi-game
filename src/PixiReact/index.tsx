import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '@pixi/react';

import { Game } from '../pages/game';
import { World } from '../components/World';
import { Settings } from '../components/ui/Settings';
import { ReduxStage } from '../components/ReduxStage';
import {
  selectAppControllerHeight,
  selectAppControllerPage,
  selectAppControllerWidth,
} from '../redux/appController/selectors';
import { NORMAL_NOVEL_FONT, Pages, __IS_DEV__ } from '../constants';
import { Novel } from '../pages/novel';
import { setPage } from '../redux/appController';
import { HintBox } from '../components/ui/HintBox';
import { StartScreen } from '../pages/startScreen';

const getPage = (page: Pages) => {
  switch (page) {
    case Pages.game:
      return <Game />;
    case Pages.novel:
      return <Novel />;
    case Pages.startScreen:
      return <StartScreen />;
  }
};

export const PixiReact = React.memo(() => {
  const page = useSelector(selectAppControllerPage);
  const width = useSelector(selectAppControllerWidth);
  const height = useSelector(selectAppControllerHeight);

  const dispatch = useDispatch();

  const handlePageChange = useCallback(() => {
    dispatch(setPage(page === Pages.game ? Pages.novel : Pages.game));
  }, [dispatch, page]);

  return (
    <ReduxStage
      width={width}
      height={height}
      options={{ backgroundColor: 0xffffff, antialias: true, autoDensity: true }}
    >
      <Settings>
        <World>{getPage(page)}</World>
        <HintBox />
      </Settings>
      {__IS_DEV__ && <Text
        text={page[0]}
        x={20}
        y={20}
        style={NORMAL_NOVEL_FONT}
        interactive
        onpointerdown={handlePageChange}
      />}
    </ReduxStage>
  );
});
