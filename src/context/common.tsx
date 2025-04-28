import { useState } from 'react';
import { CommonContext } from '../Types/context';

type ContextProviderProps = {
  children: React.ReactNode;
};

export const DataProvider = ({ children }: ContextProviderProps) => {
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  return (
    <CommonContext.Provider
      value={{
        loginOpen,
        setLoginOpen,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};
