import { Graphics as PIXI_Grapics } from 'pixi.js';
import { Graphics } from '@pixi/react';
import React, { useRef, useCallback, forwardRef, memo } from 'react';

// TODO Разделить
type RProps = {
  lineWidth: number;
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  color: number;
};

export const Rectangle = memo(
  forwardRef<PIXI_Grapics, RProps>(({ x, y, color, lineWidth, rotation, width, height }, ref) => {
    const [mounted, setMounted] = React.useState(false);
    const originalRef = useRef(null);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    const draw = useCallback(
      (g: PIXI_Grapics) => {
        console.log('draw');
        g.clear();
        g.lineStyle(lineWidth, color);
        g.drawRect(lineWidth, lineWidth, width - 2 * lineWidth, height - 2 * lineWidth);
      },
      [color, height, lineWidth, width],
    );

    return (
      <>
        <Graphics draw={draw} ref={originalRef} x={-10000} y={-10000} />
        {mounted && (
          <Graphics
            ref={ref}
            x={x}
            y={y}
            rotation={rotation}
            /* @ts-ignore */
            geometry={originalRef.current}
            pivot={{ x: width / 2, y: height / 2 }}
          />
        )}
      </>
    );
  }),
);
