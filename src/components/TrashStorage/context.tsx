import React, { createContext, useCallback, useContext } from 'react'
import { State } from './typings';

const initialState: State = {
  get: (id, type) => {console.log('GET', id, type); return 0;},
  set: (id, type, value) => console.log('SET', id, type, value),
  onChange: (id, type, cb) => console.log('ON CHANGE', id, type, cb),
  clearOnChange: (id, type, cb) => console.log('ON CHANGE', id, type, cb),
};

const TrashContext = createContext<State>(initialState);
export const TrashContextProvider = TrashContext.Provider;
export const useTrash = (id?: number | string | null) => {
  const {
    get,
    set,
    onChange,
    clearOnChange,
  } = useContext(TrashContext);


  return {
    get: get ?? initialState.get,
    set: set ?? initialState.set,
    onChange: onChange ?? initialState.onChange,
    clearOnChange: clearOnChange ?? initialState.clearOnChange,
  }
}
