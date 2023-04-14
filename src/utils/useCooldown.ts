import { useCallback, useEffect, useRef, useState } from 'react';

export const useCooldown = (cooldown: number) => {
  const [isCooldown, setCooldown] = useState(false);
  const listeners = useRef<(() => void)[]>([]);
  const isCooldownRef = useRef(false);
  useEffect(() => {
    if (!isCooldown) return;

    const id = setTimeout(() => {
      console.log('HELLO?');
      setCooldown(false);
      isCooldownRef.current = false;
    }, cooldown);
    return () => {
      clearTimeout(id);
      console.log('WTF HELLO?');
    };
  }, [cooldown, isCooldown]);

  const onCooldownEnd = useCallback((listener: () => void) => listeners.current.push(listener), []);
  const startCooldown = useCallback(() => {
    setCooldown(true);
    isCooldownRef.current = true;
    console.log('FUCK??');
  }, []);

  return { isCooldown: isCooldownRef.current, onCooldownEnd, startCooldown };
};
