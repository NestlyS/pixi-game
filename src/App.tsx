import FontFaceObserver from 'fontfaceobserver';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Assets } from 'pixi.js';
import { Text } from '@pixi/react';

import { Game } from './pages/game';
import { World } from './components/World';
import { Settings } from './components/ui/Settings';
import { ReduxStage } from './components/ReduxStage';
import { selectAppControllerPage } from './redux/appController/selectors';
import { NORMAL_NOVEL_FONT, Pages } from './constants';
import { Novel } from './pages/novel';

import './App.css';
import { setPage } from './redux/appController';

const manifestUrl = 'assets-manifest.json';
export let WORLD_WIDTH = 1600;
export let WORLD_HEIGHT = 900;

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
      setIsLoaded(true);
    };

    cb();

    const root = document.querySelector('#root') as HTMLElement;
    const scaleWidth = root.clientWidth < WORLD_WIDTH ? root.clientWidth / WORLD_WIDTH : 1;
    WORLD_WIDTH = root.clientWidth;
    WORLD_HEIGHT = WORLD_HEIGHT * scaleWidth;

    setRoot(root);
  }, []);

  const handlePageChange = useCallback(() => {
    dispatch(setPage(page === Pages.game ? Pages.novel : Pages.game));
  }, [page]);

  if (!isLoaded || !root) return null;

  return (
    <div className="App">
      <ReduxStage
        width={WORLD_WIDTH}
        height={WORLD_HEIGHT}
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
