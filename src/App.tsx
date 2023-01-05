import { Stage} from '@inlet/react-pixi';
import './App.css';
import { Canvas } from './components/Canvas';
import { World } from './components/World';
import { WORLD_WIDTH, WORLD_HEIGHT } from './constants';
import { Settings } from './components/Settings';

const App = () => {
  return (
    <div className="App">
      <Stage width={WORLD_WIDTH} height={WORLD_HEIGHT} options={{ backgroundColor: 0x555555, antialias: false }}>
        <Settings>
          <World>
            <Canvas />
          </World>
        </Settings>
      </Stage>
    </div>
  );
}

export default App;
