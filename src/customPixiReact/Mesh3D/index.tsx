import { PixiComponent } from '@inlet/react-pixi';
import { Material, MeshGeometry3D, Mesh3D as Mesh3DInstance } from 'pixi3d';
import { ForwardedRef, forwardRef } from 'react';
import { getMeshInstance, MESH_TYPE, updateMeshProps } from './utils';

type Props = {
  x?: number;
  y?: number;
  z?: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  material?: Material;
  geometry?: MeshGeometry3D;
  ref?: ForwardedRef<Mesh3DInstance>;
};

export const Sphere = PixiComponent('Mesh3D', {
  create: ({ material, geometry }: Props) => {
    console.log('created', 'Sphere');
    return getMeshInstance(MESH_TYPE.Sphere, geometry, material);
  },
  applyProps: (instance, oldProps, newProps) => {
    const { x = 0, y = 0, z = 0, rotationX = 0, rotationY = 0, rotationZ = 0 } = newProps;

    return updateMeshProps({ instance, x, y, z, rotationX, rotationY, rotationZ });
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

export const Cube = PixiComponent('Cube', {
  create: ({ material, geometry }: Props) => {
    console.log('created', 'Cube');
    return getMeshInstance(MESH_TYPE.Cube, geometry, material);
  },
  applyProps: (instance, oldProps, newProps) => {
    const { x = 0, y = 0, z = 0, rotationX = 0, rotationY = 0, rotationZ = 0 } = newProps;

    return updateMeshProps({ instance, x, y, z, rotationX, rotationY, rotationZ });
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
