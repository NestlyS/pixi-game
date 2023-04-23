import { Container } from '@pixi/react';
import { useSelector } from 'react-redux';
import { Sprite } from '../../Sprite';
import { selectMainUserId, selectMainUserMaxHp } from '../../../redux/mainUser/selectors';
import { COLOR_OVERLAY_FILTER_STEP_1 } from '../../../constants';
import { selectHealthValueById } from '../../../redux/health/selectors';

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  pad: number;
  spritesheetUrl: string;
  textureUrl: string;
  darkTextureUrl: string;
};

export const HeartBar = ({
  x,
  y,
  width,
  height,
  pad,
  spritesheetUrl,
  textureUrl,
  darkTextureUrl,
}: Props) => {
  const id = useSelector(selectMainUserId);
  const maxHp = useSelector(selectMainUserMaxHp);
  const currentHealth = useSelector(selectHealthValueById(String(id)));

  if (currentHealth === null || currentHealth === undefined) return null;

  return (
    <Container zIndex={10}>
      {new Array(maxHp)
        .fill(0)
        .map((_, index) => [
          <Sprite
            key={index}
            x={x + (width + pad) * index}
            y={y}
            pixelised
            spritesheet={spritesheetUrl}
            textureUrl={textureUrl}
            height={height}
            width={width}
            filters={index + 1 > currentHealth ? [COLOR_OVERLAY_FILTER_STEP_1] : []}
          />,
          index + 1 > currentHealth && (
            <Sprite
              key={`${index}-down`}
              x={x + (width + pad) * index}
              y={y}
              pixelised
              spritesheet={spritesheetUrl}
              textureUrl={darkTextureUrl}
              height={height}
              width={width}
            />
          ),
        ])}
    </Container>
  );
};
