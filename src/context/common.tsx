import { useState } from 'react';
import { CommonContext } from '../Types/context';

type ContextProviderProps = {
  children: React.ReactNode;
};

export const DataProvider = ({ children }: ContextProviderProps) => {
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [registerOpen, setRegisterOpen] = useState<boolean>(false);

  const OpenRegister = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  const OpenLogin = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };
  return (
    <CommonContext.Provider
      value={{
        loginOpen,
        setLoginOpen,
        registerOpen,
        setRegisterOpen,
        OpenRegister,
        OpenLogin,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};
