import { useContext, useEffect, useRef, useState } from 'react';
import { CommonContext } from '../Types/context';
import { LoginModal } from './login';
import { RegisterModal } from './register';

export const AuthModal = () => {
  const { loginOpen, registerOpen } = useContext(CommonContext);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Update height based on content
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [loginOpen, registerOpen]); // Trigger on modal switch

  const showModal = loginOpen || registerOpen;

  return (
    <div
      className={`${
        !showModal ? 'hidden' : 'flex'
      } fixed z-50 bg-black/50 h-screen w-full items-center justify-center`}
    >
      <div
        className="bg-white w-full md:max-w-[750px] overflow-hidden transition-all duration-500 ease-in-out rounded-xl"
        style={{ height: `${contentHeight}px` }}
      >
        <div ref={contentRef} className="pt-10 pb-16 px-5">
          {loginOpen ? <LoginModal /> : registerOpen ? <RegisterModal /> : null}
        </div>
      </div>
    </div>
  );
};
