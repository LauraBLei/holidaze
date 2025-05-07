import React, { useState } from 'react';
import { CommonContext, ConfirmOptions } from '../Types/context';
import { Confirm } from '../Components/confirm';

type ContextProviderProps = {
  children: React.ReactNode;
};

export const DataProvider = ({ children }: ContextProviderProps) => {
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [registerOpen, setRegisterOpen] = useState<boolean>(false);
  const [confirmOptions, setConfirmOptions] = useState<ConfirmOptions | null>(null);

  const confirm = (options: ConfirmOptions) => {
    setConfirmOptions(options);
  };

  const handleConfirm = () => {
    confirmOptions?.onConfirm();
    setConfirmOptions(null);
  };

  const handleCancel = () => {
    confirmOptions?.onCancel?.();
    setConfirmOptions(null);
  };

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
        confirm, // 🔥 Now part of your context
      }}
    >
      {children}
      {confirmOptions && (
        <Confirm
          message={confirmOptions.message}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </CommonContext.Provider>
  );
};
