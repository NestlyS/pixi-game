import { Text} from '@inlet/react-pixi';
import { TextStyle } from '@pixi/text';
import { Body } from '../Body';
import { useGlobalCheck } from '../../utils/useControlKey';
import { ControllableBody } from '../Controllable';
import { GlobalViewport } from '../GlobalViewport';
import { WORLD_HEIGHT } from '../../constants';
import { SpriteController } from '../controllers/SpriteController';
import { Grass } from '../TileGround/components/Grass/Grass';
import { LevelManager } from '../LevelManager';
import { HealthStorage } from '../HealthStorage';


const TEXT_STYLE = new TextStyle({
  align: 'center',
  fill: ['#ff578f', '#800080'],
  stroke: '#fff',
  strokeThickness: 5,
  letterSpacing: 20,
});


export const Canvas = () => {
  useGlobalCheck();
  return (
    // TODO Исправить размерности, докинуть пропсов
    <>
      <HealthStorage>
        <Text text='dsadas' style={TEXT_STYLE}/>
        <GlobalViewport width={WORLD_HEIGHT / 2} height={WORLD_HEIGHT / 2}>
          <ControllableBody />
          <Body x={650} y={50} width={100} height={80}>
            <SpriteController width={100} height={80} textureUrl='./crate.png' />
          </Body>
          <Body x={600} y={-50} width={100} height={80}>
            <SpriteController width={100} height={80} textureUrl='./crate.png' />
          </Body>
          <Body x={550} y={50} width={100} height={80}>
            <SpriteController width={100} height={80} textureUrl='./crate.png' />
          </Body>
          <Grass x={400} y={410} tilesWidth={14} tilesHeight={3} tileSize={60} />
          <Grass x={800} y={210} tilesWidth={4} tilesHeight={1} tileSize={60} />
          <LevelManager x={1000} y={500} tileSize={60} chunkWidth={25} tilesHeight={5} />
        </GlobalViewport>
      </HealthStorage>
    </>
  )
}
