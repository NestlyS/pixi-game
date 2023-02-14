import { Container } from '@inlet/react-pixi';
import { useHealth } from '../../HealthStorage/context';
import { useMainUserId } from '../../MainUserStorage/context';
import { Sprite } from '../../Sprite';

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  pad: number;
  spritesheetUrl: string;
  textureUrl: string;
};

export const HeartBar = ({ x, y, width, height, pad, spritesheetUrl, textureUrl }: Props) => {
  const { id } = useMainUserId();
  const { currentHealth } = useHealth(id ?? undefined);

  if (!currentHealth) return null;

  console.log(currentHealth, id, 'HEALTH');

  return (
    /* @ts-ignore */
    <Container zIndex={10}>
      {new Array(currentHealth).fill(0).map((_, index) => (
        <Sprite
          key={index}
          x={x + (width + pad) * index}
          y={y}
          pixelised
          spritesheet={spritesheetUrl}
          textureUrl={textureUrl}
          height={height}
          width={width}
        />
      ))}
    </Container>
  );
};
