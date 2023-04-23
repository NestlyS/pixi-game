import FontFaceObserver from 'fontfaceobserver';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Assets } from 'pixi.js';
import { Text } from '@pixi/react';

import { Game } from './pages/game';
import { World } from './components/World';
import { Settings } from './components/ui/Settings';
import { ReduxStage } from './components/ReduxStage';
import {
  selectAppControllerHeight,
  selectAppControllerPage,
  selectAppControllerWidth,
} from './redux/appController/selectors';
import { DEFAULT_WORLD_HEIGHT, DEFAULT_WORLD_WIDTH, NORMAL_NOVEL_FONT, Pages } from './constants';
import { Novel } from './pages/novel';

import './App.css';
import { setPage, setResolution } from './redux/appController';
import { isNovelReaded } from './redux/novelPage/utils';

const manifestUrl = 'assets-manifest.json';

const getPage = (page: Pages) => {
  switch (page) {
    case Pages.game:
      return <Game />;
    case Pages.novel:
      return <Novel />;
  }
};

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const page = useSelector(selectAppControllerPage);
  const width = useSelector(selectAppControllerWidth);
  const height = useSelector(selectAppControllerHeight);

  const dispatch = useDispatch();

  useEffect(() => {
    const cb = async () => {
      const font = new FontFaceObserver('Press Start 2P', {});
      // Start loading the font
      await font.load().catch(() => {
        // Failed load, log the error or display a message to the user
        alert('Unable to load required font!');
      });

      await Assets.init({ manifest: manifestUrl });
      await Assets.loadBundle('main');
      setIsLoaded(true);
    };

    cb();

    const root = document.querySelector('#root') as HTMLElement;
    const scaleWidth =
      root.clientWidth < DEFAULT_WORLD_WIDTH ? root.clientWidth / DEFAULT_WORLD_WIDTH : 1;
    dispatch(setResolution({ width: root.clientWidth, height: scaleWidth * DEFAULT_WORLD_HEIGHT }));

    if (isNovelReaded()) dispatch(setPage(Pages.game));

    setRoot(root);
  }, []);

  const handlePageChange = useCallback(() => {
    dispatch(setPage(page === Pages.game ? Pages.novel : Pages.game));
  }, [page]);

  if (!isLoaded || !root) return null;

  return (
    <div className="App">
      <ReduxStage
        width={width}
        height={height}
        options={{ backgroundColor: 0xffffff, antialias: false }}
      >
        <Settings>
          <World>{getPage(page)}</World>
        </Settings>
        <Text
          text={page[0]}
          x={20}
          y={20}
          style={NORMAL_NOVEL_FONT}
          interactive
          onpointerdown={handlePageChange}
        />
      </ReduxStage>
    </div>
  );
};

export default App;
