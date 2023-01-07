import { useCallback, useEffect, useRef } from "react";
import { useControlKey } from "../../../utils/useControlKey";
import { useBodyParams } from "../../Body/context";
import { useTick } from "@inlet/react-pixi";
import { applyForce } from "../../Body/utils";
import { EPS } from "../../../constants";
import { Detector } from "matter-js";
import { GROUND_COMPOSITE, onGroundCompositeChange } from "../../Ground/composite";

const DEFAULT_JUMPS = 1;
const UPDATE_PERIOD = 15;

export const JumpController = () => {
  const {
    body
  } = useBodyParams();
  const jumpsLeft = useRef(DEFAULT_JUMPS);
  const deltaRef = useRef(0);
  const groundUserDetectorRef = useRef(Detector.create());

  const WCb = useCallback(() => {
    console.log('JUMPS_LEFT', jumpsLeft.current);

    if (!body || jumpsLeft.current <= 0 || body.velocity.y > EPS) return;
    applyForce(body, 0, -0.25);
    jumpsLeft.current -= 1;
  }, [body])

  useControlKey('KeyW', WCb);

  useEffect(() => {
    if (!body) return;

    const cb = () => Detector.setBodies(groundUserDetectorRef.current, [...GROUND_COMPOSITE.bodies, body]);

    cb();
    onGroundCompositeChange.add(cb);

    return () => {
      onGroundCompositeChange.clearCb(cb);
    }
  }, [body]);

  useTick(delta => {
    deltaRef.current += delta;

    if (deltaRef.current < UPDATE_PERIOD || !body) return;

    deltaRef.current = 0;

    const isOnGround = Detector.collisions(groundUserDetectorRef.current).some(collision => (collision.bodyA === body || collision.bodyB === body) && collision.collided);

    if (isOnGround) {
      jumpsLeft.current = DEFAULT_JUMPS;
    }
  });

  return null;
};