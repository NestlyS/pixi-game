import { Material, Mesh3D as Mesh3DInstance, MeshGeometry3D } from "pixi3d";

export enum MESH_TYPE {
  Cube = 'cube',
  Sphere = 'sphere',
  Custom = 'custom',
}

export const getMeshInstance = (meshType?: MESH_TYPE, geometry?: MeshGeometry3D, material?: Material) => {
  const defaultMesh = Mesh3DInstance.createCube(material);

  switch (meshType) {
    case MESH_TYPE.Cube: return Mesh3DInstance.createCube(material);
    case MESH_TYPE.Sphere: return Mesh3DInstance.createSphere(material);
    case MESH_TYPE.Custom: return geometry ? new Mesh3DInstance(geometry, material) : defaultMesh;

    default:
      return defaultMesh;
  }
}

export const updateMeshProps = ({
  instance,
  x,
  y,
  z,
  rotationX,
  rotationY,
  rotationZ,
} : {
  instance: Mesh3DInstance
  x: number,
  y: number,
  z: number,
  rotationX: number,
  rotationY: number,
  rotationZ: number
}) => {
  console.log(instance);
  instance.position.set(x, y, z);
  instance.rotationQuaternion.setEulerAngles(rotationX, rotationY, rotationZ);

  return instance;
}