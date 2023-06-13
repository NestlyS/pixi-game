import { useCallback, useEffect, useRef, useState } from 'react';

export const useCooldown = (cooldown: number) => {
  const [isCooldown, setCooldown] = useState(false);
  const listeners = useRef<(() => void)[]>([]);
  const isCooldownRef = useRef(false);
  useEffect(() => {
    if (!isCooldown) return;

    const id = setTimeout(() => {
      setCooldown(false);
      isCooldownRef.current = false;
    }, cooldown);
    return () => {
      clearTimeout(id);
    };
  }, [cooldown, isCooldown]);

  const onCooldownEnd = useCallback((listener: () => void) => listeners.current.push(listener), []);
  const startCooldown = useCallback(() => {
    setCooldown(true);
    isCooldownRef.current = true;
  }, []);

  return { isCooldown: isCooldownRef.current, onCooldownEnd, startCooldown };
};
