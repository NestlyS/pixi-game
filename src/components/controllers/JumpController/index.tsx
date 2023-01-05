import { useCallback, useEffect, useRef, useState } from "react";
import { useControlKey } from "../../../utils/useControlKey";
import { useBodyParams } from "../../Body/context";
import { GROUND_COLLISION_EVENT_NAME } from "../../Ground";
import { useEngine } from "../../../utils/useEngine";
import { useTick } from "@inlet/react-pixi";
import { applyForce, calcForceApply } from "../../Body/utils";
import { EPS } from "../../../constants";
import { IEventCollision, Engine } from "matter-js";

const DEFAULT_JUMPS = 1;

export const JumpController = () => {
  const {
    body
  } = useBodyParams();
  const jumpsLeft = useRef(DEFAULT_JUMPS);

  useEffect(() => {
    const callback = (e: Event) => {

      console.log('COLLISION', e);

      if (!((e as CustomEvent).detail as IEventCollision<Engine>).pairs.some(p => p.bodyA === body || p.bodyB === body)) return;

      console.log('COLLISION2')

      jumpsLeft.current = DEFAULT_JUMPS;
    }

    window.addEventListener(GROUND_COLLISION_EVENT_NAME, callback);

    return () => {
      window.removeEventListener(GROUND_COLLISION_EVENT_NAME, callback);
    }

  }, [body]);

  const WCb = useCallback(() => {
    if (!body || jumpsLeft.current <= 0 || body.velocity.y > EPS) return;
    applyForce(body, 0, -0.25);
    jumpsLeft.current -= 1;
  }, [body])

  useControlKey('KeyW', WCb);

  return null;
};