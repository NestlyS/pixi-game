import { useMemo, useState } from 'react';

export const useInitPageData = (cb: () => Promise<void>) => {
  const [isLoaded, setLoaded] = useState(false);

  useMemo(() => cb().then(() => setLoaded(true)), [cb]);

  return isLoaded;
};
