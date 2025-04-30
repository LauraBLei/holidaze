import { Outlet } from 'react-router-dom';
import Footer from './Footer.tsx';
import Header from './Header.tsx';
import { LoginModal } from './login.tsx';
import { RegisterModal } from './register.tsx';

export const Layout = () => {
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <Header />
      <main className="flex flex-col justify-center items-center w-full">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
