import { AnimatedSprite } from 'pixi.js';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useContainer } from '../../ViewController/context';
import { selectMainUserDirection } from '../../../../redux/mainUser/selectors';
import { Directions } from '../../../Bullet/controller';

export const MainUserSpriteDirectionController = () => {
  const container = useContainer<AnimatedSprite>();
  const direction = useSelector(selectMainUserDirection);

  useEffect(() => {
    if (!container) return;

    container.scale.set(direction === Directions.Right ? 1 : -1, container.scale.y);
  }, [container, direction]);

  return null;
};
