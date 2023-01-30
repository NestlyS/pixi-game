import { Container, Stage } from '@inlet/react-pixi';
import FontFaceObserver from 'fontfaceobserver';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Canvas } from './components/Canvas';
import { World } from './components/World';
import { WORLD_WIDTH, WORLD_HEIGHT } from './constants';
import { Settings } from './components/Settings';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let font = new FontFaceObserver('Press Start 2P', {});
    // Start loading the font
    font.load().then(() => {
      // Successful load, start up your PixiJS app as usual
      setIsLoaded(true);
    }, () => {
      // Failed load, log the error or display a message to the user
      alert('Unable to load required font!');
    });

    setRoot(document.querySelector('#root') as HTMLElement);
  }, []);

  if (!isLoaded || !root) return null;

  return (
    <div className="App">
      <Stage width={window.document.body.clientWidth} height={WORLD_HEIGHT} options={{ backgroundColor: 0x99c5ff, antialias: false}}>
        { /* @ts-ignore */}
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
}

export default App;

