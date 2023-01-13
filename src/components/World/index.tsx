import React, { useEffect, useState } from "react";
import { useTick } from "@inlet/react-pixi";
import { Engine, Render } from "matter-js";
import { EngineContext } from "../../utils/useEngine";

type Props = {
  children: React.ReactElement | React.ReactElement[];
}

export const World: React.FC<Props> = ({ children }) => {
  const [engine] = useState(() => Engine.create());
  useTick((delta) => Engine.update(engine, delta * (1000 / 60)));

  useEffect(() => {
    console.log(engine);

    const engine_ = engine;

    if (!engine) return;

    const render = Render.create({
      element: window.document.body,
      engine: engine_,
      options: {
        showCollisions: true,
        showPositions: true,
      }
    });

    // run the renderer
    Render.run(render);
  }, [engine]);

  return <EngineContext.Provider value={engine}>{children}</EngineContext.Provider>;
};
