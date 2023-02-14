type BodyObject = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const boxCollision = (body1: BodyObject, body2: BodyObject) => {
  const left1 = body1.x;
  const left2 = body2.x;
  const right1 = body1.x + body1.width;
  const right2 = body2.x + body2.width;
  const top1 = body1.y;
  const top2 = body2.y;
  const bottom1 = body1.y + body1.height;
  const bottom2 = body2.y + body2.height;
  if (bottom1 < top2) return false;
  if (top1 > bottom2) return false;

  if (right1 < left2) return false;
  if (left1 > right2) return false;

  return true;
};
