export type PositiveShould = ({ should: true, toX: number, toY: number});
export type NegativeShould = ({ should: false});
export type ShouldApplyForce = () => PositiveShould | NegativeShould;
export type CleanEventType = {
  pairs: Matter.Pair[];
  timestamp: number;
  name: string;
  source: Matter.Engine;
};
export type CleanEventListener = (e: CleanEventType) => void;