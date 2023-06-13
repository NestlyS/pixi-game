import { useSelector } from 'react-redux';
import { selectAppControllerWidth } from '../../../../../../redux/appController/selectors';
import { Sprite } from '../../../../../../components/Sprite';
import { START_SCREEN_SPRITESHEET_URL } from '../../../../../../constants';

const PIC_WIDTH = 1900;

const LEFT_BACKGROUND_TEXTURE_URL = 'pattern_left.png';

const ANCHOR = { x: 0, y: 0 };

type Props = {
  startX: number;
  scale: number;
};

export const LeftBackgroundPart = ({ startX, scale }: Props) => {
  const screenWidth = useSelector(selectAppControllerWidth);

  const scaledPicsWidth = PIC_WIDTH * scale;
  const sidePicsCount = screenWidth / scaledPicsWidth;

  return (
    <>
      {new Array(Math.floor(sidePicsCount)).fill(0).map((_, index) => (
        <Sprite
          key={index}
          x={startX - (index + 1) * scaledPicsWidth}
          y={0}
          scale={scale}
          anchor={ANCHOR}
          pixelised={false}
          textureUrl={LEFT_BACKGROUND_TEXTURE_URL}
          spritesheet={START_SCREEN_SPRITESHEET_URL}
        />
      ))}
    </>
  );
};
