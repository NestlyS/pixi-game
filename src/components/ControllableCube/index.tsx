import { useApp, useTick } from '@inlet/react-pixi';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Cube, Sphere } from '../../customPixiReact/Mesh3D';
import { MESH_TYPE } from '../../customPixiReact/Mesh3D/utils';
import { Viewport as PixiViewport } from 'pixi-viewport';
import Viewport from '../../customPixiReact/ViewPort';
import { useControlKey } from '../../utils/useControlKey';

const MAX_SPEED = 1.5;
const SPEED = 0.5;
const SLOVING = 0.8;
const EXP = 0.01;

export const ControllableCube: React.FC = () => {
  const [x, setX] = useState(0);
  const [mesh, setMesh] = useState(MESH_TYPE.Sphere);
  const viewportRef = useRef<PixiViewport>(null);
  const cubeRef = useRef(null);
  const app = useApp();
  const vx = useRef(0);
  const cbW = useCallback((e: KeyboardEvent) => {
    console.log(e);
    vx.current = vx.current > MAX_SPEED ? MAX_SPEED : vx.current + SPEED;
  }, []);
  const cbS = useCallback((e: KeyboardEvent) => {
    console.log(e);

    vx.current = vx.current < -MAX_SPEED ? -MAX_SPEED : vx.current - SPEED;

    setMesh((mesh) => (mesh === MESH_TYPE.Cube ? MESH_TYPE.Sphere : MESH_TYPE.Cube));
  }, []);

  useTick(() => {
    setX((_x) => vx.current + _x);

    vx.current =
      Math.abs(vx.current) < EXP ? 0 : Math.sign(vx.current) * (Math.abs(vx.current) * SLOVING);
  });

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport || !cubeRef.current) {
      return;
    }

    console.log(viewport, cubeRef);

    viewport.snapZoom({ width: 1000, height: 1000 });
    viewport.follow(cubeRef.current, { speed: 100 });
  }, []);

  return <Sphere x={x} ref={cubeRef} />;
};
