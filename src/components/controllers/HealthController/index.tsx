import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useBody } from "../../Body/context";
import { useHealth } from "../../HealthStorage/context";
import { BodyHealthContextProvider } from "./context";

type Props = {
  bodyId?: number | string;
  initialHealth: number,
  children?: React.ReactNode,
  cooldown?: number,
}

export const HealthController = memo(({
  bodyId,
  initialHealth,
  children,
  cooldown,
}: Props) => {
  const {
    body
  } = useBody();

  const id = bodyId ?? body?.id;

  const {
    currentHealth,
    setHealth,
    onCooldown,
    clearCooldown,
  } = useHealth(id);

  const [isCooldown, setCooldown] = useState(false);

  useEffect(() => {
    if (!id) return;

    setHealth(initialHealth, id, cooldown);
  }, [cooldown, id, initialHealth, setHealth]);

  useEffect(() => {
    if (!id) return;

    const cb = (cooldown: boolean) => {
      setCooldown(cooldown);
    }

    onCooldown(cb, id);

    return () => clearCooldown(cb, id);
  }, [clearCooldown, id, onCooldown]);

  const calculateHealth = useCallback(
    (value: number) => {
      if (!id) return;

      setHealth(value);
    },
    [id, setHealth],
  );

  const addHealth = useCallback((amount: number) => currentHealth && calculateHealth(currentHealth + amount), [calculateHealth, currentHealth]);
  const makeDamage = useCallback((amount: number) => currentHealth && calculateHealth(currentHealth - amount), [calculateHealth, currentHealth]);

  const value = useMemo(() => {
    return {
      isCooldown,
      currentHealth,
      addHealth,
      makeDamage,
    }
  }, [isCooldown, currentHealth, addHealth, makeDamage]);

  console.log(isCooldown, currentHealth, value);

  return (
    <BodyHealthContextProvider value={{
      isCooldown,
      currentHealth,
      addHealth,
      makeDamage,
    }}>
      {children}
    </BodyHealthContextProvider>
  );
});