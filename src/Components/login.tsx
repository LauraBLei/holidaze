import { useContext } from 'react';
import { CommonContext } from '../Types/context';

export const LoginModal = () => {
  const { loginOpen, OpenRegister } = useContext(CommonContext);
  return (
    <section className={`absolute z-50 ${loginOpen ? 'block' : 'hidden'}`}>
      <button onClick={() => OpenRegister()}>Register</button>
    </section>
  );
};
