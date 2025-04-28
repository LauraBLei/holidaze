import { createContext } from 'react';

type CommonContextType = {
  loginOpen: boolean;
  setLoginOpen: (input: boolean) => void;
};

export const CommonContext = createContext<CommonContextType>({} as CommonContextType);
