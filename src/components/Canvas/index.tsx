import { Container, Text} from '@inlet/react-pixi';
import { TextStyle } from '@pixi/text';
import { Body } from '../Body';
import { useGlobalCheck } from '../../utils/useControlKey';
import { ControllableBody } from '../Controllable';
import { GlobalViewport } from '../GlobalViewport';
import { PIXEL_FONT, WORLD_HEIGHT } from '../../constants';
import { SpriteController } from '../controllers/SpriteController';
import { Grass } from '../TileGround/components/Grass/Grass';
import { LevelManager } from '../LevelManager';
import { HealthStorage } from '../HealthStorage';
import { HeartBar } from '../HeartBar';
import { GROUND_BODY_GROUP } from '../../bodyGroups/ground';
import { Box } from '../Box';
import { Background } from '../Background';

export const spritesheetUrl = "./sprites/atlas.json";
const TEXTURE_URL = 'heart.png';

export const Canvas = () => {
  useGlobalCheck();
  return (
    <HealthStorage>
      {/* @ts-ignore */}
      <Container sortableChildren={true}>
        <Background />
        <Text x={90} y={10} text='Ева' style={PIXEL_FONT}/>
        <HeartBar x={90} y={50} width={60} height={55} pad={10} spritesheetUrl={spritesheetUrl} textureUrl={TEXTURE_URL} />
        <GlobalViewport width={WORLD_HEIGHT / 2} height={WORLD_HEIGHT / 2}>
          <Box x={575} y={-100} width={100} height={80} />
          <Box x={600} y={-50} width={100} height={80} />
          <Box x={300} y={50} width={150} height={120} />
          <Grass x={400} y={410} tilesWidth={14} tilesHeight={3} tileSize={60} spritesheetUrl={spritesheetUrl} />
          <Grass x={800} y={210} tilesWidth={4} tilesHeight={1} tileSize={60} spritesheetUrl={spritesheetUrl} />
          <LevelManager x={1000} y={500} tileSize={60} chunkWidth={25} tilesHeight={5} spritesheetUrl={spritesheetUrl} />
          <ControllableBody />
        </GlobalViewport>
      </Container>
    </HealthStorage>
  )
}
