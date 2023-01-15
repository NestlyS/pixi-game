import { Container } from "@inlet/react-pixi";
import { USER_HEALTH_ID } from "../Controllable";
import { useHealth } from "../HealthStorage/context";
import { Sprite } from "../Sprite"

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  pad: number;
  spritesheetUrl: string;
  textureUrl: string;
}

export const HeartBar = ({
  x,
  y,
  width,
  height,
  pad,
  spritesheetUrl,
  textureUrl,
}: Props) => {
  const {
    currentHealth,
  } = useHealth(USER_HEALTH_ID);

  if (!currentHealth) return null;

  console.log(currentHealth, USER_HEALTH_ID, 'HEALTH');

  return (
    /* @ts-ignore */
    <Container zIndex={10}>
      {
      (new Array(currentHealth))
        .fill(0)
        .map((_ ,index) =>
          <Sprite key={index} x={x + (width + pad) * index} y={y} pixelised spritesheet={spritesheetUrl} textureUrl={textureUrl} height={height} width={width}/>
        )
      }
    </Container>
  );
}