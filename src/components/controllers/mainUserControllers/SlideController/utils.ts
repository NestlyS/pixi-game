import { Container } from 'pixi.js';

/**
 * Из-за того, что спрайт не может корректно определить свое расположение относительно пола,
 *  мы ему с этим помогаем, сдвигая на самую узкую часть объекта.
 * Когда требуется вернуться в обратное положение, мы сдвигаем объект опираясь на уже записанное значение о
 *  его положении. Это может помочь избежать ситуаций, когда спрайт уедет прочь после нескольких итераций сдвиганий
 * Мне вообще не нравится это решение, но пока что оно самое очевидное.
 */
export const { moveSpriteCenter, returnSpriteCenter } = (() => {
  let prevValue = { x: 0, y: 0 };

  return {
    moveSpriteCenter: (container: Container, offset: number) => {
      prevValue = { x: container.pivot.x, y: container.pivot.y };

      container.pivot.set(prevValue.x, offset);
    },
    returnSpriteCenter: (container: Container) => {
      container.pivot.set(prevValue.x, prevValue.y);
    },
  };
})();
