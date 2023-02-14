import { Container, Stage } from '@inlet/react-pixi';
import FontFaceObserver from 'fontfaceobserver';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Canvas } from './components/Canvas';
import { World } from './components/World';
import { Settings } from './components/ui/Settings';

export let WORLD_WIDTH = 1600;
export let WORLD_HEIGHT = 900;

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let font = new FontFaceObserver('Press Start 2P', {});
    // Start loading the font
    font.load().then(
      () => {
        // Successful load, start up your PixiJS app as usual
        setIsLoaded(true);
      },
      () => {
        // Failed load, log the error or display a message to the user
        alert('Unable to load required font!');
      },
    );

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
        {/* @ts-ignore */}
        <Container sortableChildren>
          <Settings>
            <World>
              <Canvas />
            </World>
          </Settings>
        </Container>
      </Stage>
    </div>
  );
};

export default App;
