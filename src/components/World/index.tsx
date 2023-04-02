import React, { useEffect, useState } from 'react';
import { useTick } from '@pixi/react';
import { Body, Engine, Events, Render } from 'matter-js';
import { EngineContext } from '../../utils/useEngine';
import { usePausedState } from '../ui/Settings/context';
import { UNGRAVITY_BODY_GROUP } from '../../bodyGroups/ungravity';

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

export const World: React.FC<Props> = ({ children }) => {
  const [engine] = useState(() => Engine.create());
  const isPaused = usePausedState();
  console.log('PAUSED', isPaused);
  useTick((delta) => {
    if (!isPaused) Engine.update(engine, delta * (1000 / 60));
  });

  useEffect(() => {
    const cb = () => {
      UNGRAVITY_BODY_GROUP.get().forEach((body) =>
        Body.applyForce(body, body.position, { x: 0, y: -body.mass * 1e-3 }),
      );
    };

    Events.on(engine, 'beforeUpdate', cb);

    return () => Events.off(engine, 'beforeUpdate', cb);
  }, [engine]);

  useEffect(() => {
    console.log(engine);

    const engine_ = engine;

    if (!engine) return;
    return;

    const render = Render.create({
      element: window.document.body,
      engine: engine_,
      options: {
        showCollisions: true,
        showPositions: true,
      },
    });

    // run the renderer
    Render.run(render);
  }, [engine]);

  return <EngineContext.Provider value={engine}>{children}</EngineContext.Provider>;
};
