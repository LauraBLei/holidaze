import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CommonContext } from '../Types/context';
import { LoginModal } from './LoginModal';
import { RegisterModal } from './RegisterModal';

/**
 * AuthModal component renders a modal for user authentication (login or register).
 * It listens to the context state and conditionally displays either the login or
 * register modal. The modal also handles showing and hiding animations, and
 * closes when the Escape key is pressed or when the background is clicked.
 *
 * @component
 * @example
 * return <AuthModal />;
 *
 * @returns {JSX.Element | null} The AuthModal component containing either the
 * LoginModal or RegisterModal based on the context state.
 */

export const AuthModal = () => {
  const { loginOpen, registerOpen, setRegisterOpen, setLoginOpen } = useContext(CommonContext);
  const [visible, setVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const showModal = loginOpen || registerOpen;

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setRegisterOpen(false);
      setLoginOpen(false);
    }, 300);
  }, [setRegisterOpen, setLoginOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleKeyDown);
      setVisible(true);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal, handleClose]);

  if (!showModal && !visible) return null;

  return (
    <div
      onClick={handleClose}
      className={`fixed z-50 bg-black/50 h-screen w-full flex items-center justify-center transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full md:max-w-[750px] overflow-hidden rounded-xl transform transition-all duration-300 ${
          visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{ height: 'auto' }}
      >
        <div ref={contentRef} className="pt-10 pb-16 px-5">
          {loginOpen ? (
            <LoginModal onClose={handleClose} />
          ) : registerOpen ? (
            <RegisterModal onClose={handleClose} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
