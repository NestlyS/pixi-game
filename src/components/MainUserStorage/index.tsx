import React, { useMemo, useState } from 'react';
import { MainUserIdContextProvider } from './context';

type Props = {
  children: React.ReactNode;
};

export const MainUserStorage = ({ children }: Props) => {
  const [id, setId] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      id,
      setId,
    }),
    [id],
  );

  return <MainUserIdContextProvider value={value}>{children}</MainUserIdContextProvider>;
};
