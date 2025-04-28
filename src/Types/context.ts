import { createContext } from 'react';

type CommonContextType = {
  loginOpen: boolean;
  registerOpen: boolean;
  setLoginOpen: (input: boolean) => void;
  setRegisterOpen: (input: boolean) => void;
  OpenRegister: () => void;
  OpenLogin: () => void;
};

export const CommonContext = createContext<CommonContextType>({} as CommonContextType);
