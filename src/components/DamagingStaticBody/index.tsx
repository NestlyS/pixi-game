import { DAMAGING_BODY_GROUP } from '../../bodyGroups/damaging';
import { Body } from '../Body';

const TRAMPLIN_CONFIG = {
  isStatic: true,
};

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  onCollision?: (e: Matter.IEventCollision<Matter.Engine>) => void;
};

export const DamagingStaticBody = ({ x, y, width, height, onCollision }: Props) => (
  <Body
    x={x}
    y={y}
    width={width}
    height={height}
    bodyGroup={[DAMAGING_BODY_GROUP]}
    onCollision={onCollision}
    options={TRAMPLIN_CONFIG}
  />
);
