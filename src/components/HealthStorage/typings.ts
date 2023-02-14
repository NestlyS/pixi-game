export type IdType = number | string;
export type ValueType = number | null;
export type FuncValueType = (currentValue: ValueType) => ValueType;
export type HealthSetter = (
  id: IdType,
  value: ValueType | FuncValueType,
  cooldownTimeout?: number,
) => void;
export type OnCooldownCallback = (cooldown: boolean) => void;
export type OnCooldownListener = (id: IdType, cb: OnCooldownCallback) => void;

export type HealthState = {
  healthMap: Record<IdType, ValueType>;
  setHealth: HealthSetter;
  onCooldown: OnCooldownListener;
  removeCooldown: OnCooldownListener;
};

export type CooldownState = {
  [x: IdType]: { isCooldown: boolean; cooldownTimeout: number; listeners: OnCooldownCallback[] };
};
