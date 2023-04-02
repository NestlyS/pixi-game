import { PixiComponent } from '@pixi/react';
import * as PIXI3D from 'pixi3d';

type Props = {
  x?: number;
  y?: number;
  z?: number;
  intensity?: number;
};

export const Light = PixiComponent('Light', {
  // eslint-disable-next-line no-empty-pattern
  create: ({}: Props) => {
    // instantiate something and return it.
    // for instance:
    const light = new PIXI3D.Light();

    PIXI3D.LightingEnvironment.main.lights.push(light);
    return light;
  },
  didMount: (instance, parent) => {
    // apply custom logic on mount
    console.log('Mounted', instance, parent);
  },
  willUnmount: (instance, parent) => {
    // clean up before removal
    console.log('Unmounted', instance, parent);
  },
  applyProps: (instance, oldProps, newProps) => {
    const { x = 0, y = 0, z = 0, intensity = 1 } = newProps;

    instance.position.set(x, y, z);
    instance.intensity = intensity;
  },
  config: {
    // destroy instance on unmount?
    // default true
    destroy: true,

    /// destroy its children on unmount?
    // default true
    destroyChildren: true,
  },
});
