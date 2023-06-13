import { Container } from '@pixi/react';
import { useMounted } from '../../../utils/useMounted';
import { ease } from 'pixi-ease';
import { Container as PIXI_Container } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

type Props = {
  fromAlpha: number;
  toAlpha: number;
  duration: number;
  children: React.ReactNode;
  onComplete?: () => void;
};

export const ContainerTransition = ({
  fromAlpha,
  toAlpha,
  duration,
  children,
  onComplete,
}: Props) => {
  const isMounted = useMounted();
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef<PIXI_Container | null>(null);

  useEffect(() => {
    if (!ref.current || !isMounted) return;

    const generic = ease.add(ref.current, { alpha: toAlpha }, { duration, ease: 'easeInQuad' });

    generic.once('complete', () => {
      setIsVisible(toAlpha !== 0);
      onComplete?.();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toAlpha, isMounted]);

  return (
    <Container ref={ref} alpha={fromAlpha}>
      {isVisible && children}
    </Container>
  );
};
