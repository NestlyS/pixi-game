import { Engine } from 'matter-js';
import { createContext, useContext } from 'react';

export const EngineContext = createContext<Engine | null>(null);

export const useEngine = () => useContext(EngineContext);
