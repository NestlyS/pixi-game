import React, { useCallback, useMemo, useState } from 'react';
import { TrashContextProvider } from './context';
import { State, TrashState, TrashTypes } from './typings';
import { initTrash } from './utils';

type Props = {
  children: React.ReactNode;
};

export const TrashStorage = ({ children }: Props) => {
  const [trash, setTrash] = useState<TrashState>({});

  const get = useCallback<State['get']>(
    (id, type) => {
      console.log('GET', trash, id, type, trash[id]?.[type]);

      return trash[id] ? trash[id][type].value : null;
    },
    [trash],
  );

  const set = useCallback<State['set']>(
    (id, type, value) => {
      console.log('GET', trash, id, type, trash[id]?.[type]);

      if (!trash[id]) trash[id] = initTrash();
      trash[id][type].value = typeof value === 'function' ? value(trash[id][type].value) : value;
      trash[id][type].listeners.filter((cb) => cb(type, trash[id][type].value));
      setTrash(trash);
    },
    [trash],
  );

  const onChange = useCallback<State['onChange']>(
    (id: number | string, type: TrashTypes, cb: (type: TrashTypes, value: number) => void) => {
      if (!trash[id]) trash[id] = initTrash();
      trash[id][type].listeners.push(cb);
    },
    [trash],
  );

  const clearOnChange = useCallback<State['onChange']>(
    (id: number | string, type: TrashTypes, cb: (type: TrashTypes, value: number) => void) => {
      trash[id][type].listeners = trash[id][type].listeners.filter((_cb) => _cb !== cb);
    },
    [trash],
  );

  const value = useMemo(
    () => ({
      get,
      set,
      onChange,
      clearOnChange,
    }),
    [clearOnChange, get, onChange, set],
  );

  return <TrashContextProvider value={value}>{children}</TrashContextProvider>;
};
