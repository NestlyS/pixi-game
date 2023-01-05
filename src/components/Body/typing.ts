export type PositiveShould = ({ should: true, toX: number, toY: number});
export type NegativeShould = ({ should: false});
export type ShouldApplyForce = () => PositiveShould | NegativeShould;