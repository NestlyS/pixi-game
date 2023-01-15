import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useBody } from "../../Body/context";
import { USER_HEALTH_ID } from "../../Controllable";
import { useHealth } from "../../HealthStorage/context";
import { BodyHealthContextProvider } from "./context";

const USER_HEALTH = 3;

type Props = {
  bodyId?: number | string;
  initialHealth?: number,
  children?: React.ReactNode,
  cooldown?: number,
}

export const HealthController = memo(({
  bodyId,
  initialHealth = USER_HEALTH,
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
  } = useHealth(id);

  const [isCooldown, setCooldown] = useState(false);
  const [timer, setTimer] = useState<null | (() => NodeJS.Timeout)>(null);

  useEffect(() => {
    if (id) {
      setHealth(initialHealth);
      return;
    }


    setHealth(null);
  }, [id, initialHealth, setHealth]);

  useEffect(() => {
    if (timer) {
      const timeoutId = timer();
      return () => clearTimeout(timeoutId);
    }
  }, [timer]);

  const calculateHealth = useCallback(
    (value: number, isDamage?: boolean ) => {
      if (!id) return;

      if (cooldown && isDamage) {
        setCooldown(true);
        setTimer(() => () => setTimeout(() => setCooldown(false), cooldown))
      }

      if (isCooldown && isDamage) {
        return;
      }

      setHealth(value);
    },
    [cooldown, id, isCooldown, setHealth],
  );

  const addHealth = useCallback((amount: number) => currentHealth && calculateHealth(currentHealth + amount, false), [calculateHealth, currentHealth]);
  const makeDamage = useCallback((amount: number) => currentHealth && calculateHealth(currentHealth - amount, true), [calculateHealth, currentHealth]);

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