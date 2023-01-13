import { useCallback, useMemo, useRef, useState } from "react"
import { DeathWrapperContextProvider } from "./context"

type Props = {
  children: React.ReactNode,
}

export const DeathWrapper = ({
  children
}: Props) => {
  const [isVisible, setVisibility] = useState(true);
  const callbacksRef = useRef<(() => Promise<void>)[]>([]);

  const kill = useCallback(() =>{
    console.log('KILL INITIED');
    Promise.all(callbacksRef.current).finally(() => { console.log('KILL ENDED'); setVisibility(false)})
  }, []);
  const onKill = useCallback((cb: () => Promise<void>) => callbacksRef.current.push(cb), []);

  const value = useMemo(() => ({
    kill,
    onKill
  }), [kill, onKill])

  if (!isVisible) return null;

  return (
    <DeathWrapperContextProvider value={value}>
      {children}
    </DeathWrapperContextProvider>
  )
}