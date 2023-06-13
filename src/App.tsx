import FontFaceObserver from 'fontfaceobserver';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Assets } from 'pixi.js';

import { PixiReact } from './PixiReact';

import './App.css';
const manifestUrl = 'assets-manifest.json';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

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
  }, [dispatch]);

  if (!isLoaded) return null;

  return (
    <div className="App">
      <PixiReact />
    </div>
  );
};

export default App;
