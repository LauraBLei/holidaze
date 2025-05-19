import React, { useState } from 'react';
import { CommonContext, ConfirmOptions } from '../Types/context';
import { ConfirmDialog } from '../Components/ConfirmDialog';

type ContextProviderProps = {
  children: React.ReactNode;
};

/**
 * The DataProvider component is a context provider that manages global state for login, registration,
 * and confirmation dialogs. It provides methods to open and close login and registration modals and
 * to manage confirmation prompts within the application.
 *
 * This context includes:
 * - `loginOpen`: Boolean state to control the visibility of the login modal.
 * - `registerOpen`: Boolean state to control the visibility of the register modal.
 * - `confirmOptions`: Options for the confirmation dialog (if any), such as message and callback functions.
 * - `OpenRegister`: Function to open the registration modal and close the login modal.
 * - `OpenLogin`: Function to open the login modal and close the registration modal.
 * - `confirm`: Function to show the confirmation dialog with given options.
 *
 * @param {Object} props - The component's props.
 * @param {React.ReactNode} props.children - The child components wrapped by the context provider.
 *
 * @returns {JSX.Element} The rendered context provider that wraps the child components and manages modal visibility.
 */

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
        <ConfirmDialog
          message={confirmOptions.message}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </CommonContext.Provider>
  );
};
