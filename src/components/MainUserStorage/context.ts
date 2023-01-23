import { createContext, useContext } from "react";

type State = { id: string | null, setId: (id: string) => void};

const initialState: State = { id: null, setId: id => console.log('ID: ' + id)};

const MainUserIdContext = createContext(initialState);
export const MainUserIdContextProvider = MainUserIdContext.Provider;

export const useMainUserId = () => {
  const {
    id,
    setId
  } = useContext(MainUserIdContext);

  return {
    id,
    setId: setId ?? initialState.setId,
  }
}