import { Container, Stage } from '@pixi/react';
import FontFaceObserver from 'fontfaceobserver';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Canvas } from './components/Canvas';
import { World } from './components/World';
import { Settings } from './components/ui/Settings';
import { Assets } from 'pixi.js';

const manifestUrl = 'assets-manifest.json';
export let WORLD_WIDTH = 1600;
export let WORLD_HEIGHT = 900;

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const cb = async () => {
      let font = new FontFaceObserver('Press Start 2P', {});
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

  if (!isLoaded || !root) return null;

  return (
    <div className="App">
      <Stage
        width={WORLD_WIDTH}
        height={WORLD_HEIGHT}
        options={{ backgroundColor: 0x99c5ff, antialias: false }}
      >
        <Settings>
          <World>
            <Canvas />
          </World>
        </Settings>
      </Stage>
    </div>
  );
};

export default App;
