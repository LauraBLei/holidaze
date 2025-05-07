import { createContext } from 'react';

export interface ConfirmOptions {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export type CommonContextType = {
  loginOpen: boolean;
  registerOpen: boolean;
  setLoginOpen: (input: boolean) => void;
  setRegisterOpen: (input: boolean) => void;
  OpenRegister: () => void;
  OpenLogin: () => void;
  confirm: (options: ConfirmOptions) => void; // ✅ Add this here
};

export const CommonContext = createContext<CommonContextType>({} as CommonContextType);
