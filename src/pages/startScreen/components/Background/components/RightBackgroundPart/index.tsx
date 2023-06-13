import { useSelector } from 'react-redux';
import { selectAppControllerWidth } from '../../../../../../redux/appController/selectors';
import { Sprite } from '../../../../../../components/Sprite';
import { START_SCREEN_SPRITESHEET_URL } from '../../../../../../constants';

const PIC_WIDTH = 1950;

const RIGHT_BACKGROUND_TEXTURE_URL = 'pattern_right.png';

const ANCHOR = { x: 1, y: 0 };

type Props = {
  startX: number;
  scale: number;
};

export const RightBackgroundPart = ({ startX, scale }: Props) => {
  const screenWidth = useSelector(selectAppControllerWidth);

  const scaledPicsWidth = PIC_WIDTH * scale;
  const sidePicsCount = screenWidth / scaledPicsWidth;

  return (
    <>
      {new Array(Math.floor(sidePicsCount)).fill(0).map((_, index) => (
        <Sprite
          key={index}
          x={startX + (index + 1) * scaledPicsWidth - 1}
          y={0}
          scale={scale}
          anchor={ANCHOR}
          pixelised={false}
          textureUrl={RIGHT_BACKGROUND_TEXTURE_URL}
          spritesheet={START_SCREEN_SPRITESHEET_URL}
        />
      ))}
    </>
  );
};
