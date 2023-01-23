import { useCallback, useMemo, useRef, useState } from "react"
import { DeathListenerContextProvider, DeathWrapperContextProvider } from "./context"

type Props = {
  cooldown?: number,
  children: React.ReactNode,
}

export const DeathWrapper = ({
  cooldown = 0,
  children
}: Props) => {
  const [isVisible, setVisibility] = useState(true);
  const [isDead, setDead] = useState(false);
  const callbacksRef = useRef<(() => void)[]>([]);

  const kill = useCallback(() =>{
    console.log('KILL INITIED', callbacksRef.current);
    setDead(true);
    callbacksRef.current.forEach(cb => cb());
    setTimeout(() => {
      console.log('KILL ENDED', cooldown);
      setVisibility(false);
    }, cooldown);
  }, [cooldown]);

  if (!isVisible) return null;

  return (
    <DeathWrapperContextProvider value={kill}>
      <DeathListenerContextProvider value={isDead}>
        {children}
      </DeathListenerContextProvider>
    </DeathWrapperContextProvider>
  )
}