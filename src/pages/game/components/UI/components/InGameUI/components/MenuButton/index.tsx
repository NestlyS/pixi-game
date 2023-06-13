import { Button } from '../../../../../../../../components/ui/Button';
import { UI_SPRITESHEET_URL } from '../../../../../../../../constants';
import { useScreenWidth } from '../../../../../../../../utils/useScreenWidth';

const PAUSE_NAME = 'pause.png';

type Props = {
  onClick: () => void;
};

export const MenuButton = ({ onClick }: Props) => {
  const screenWidth = useScreenWidth();

  return (
    <Button
      onClick={onClick}
      y={10}
      x={screenWidth - 110}
      width={100}
      height={100}
      spritesheetUrl={UI_SPRITESHEET_URL}
      textureUrl={PAUSE_NAME}
      pixelised
    />
  );
};
