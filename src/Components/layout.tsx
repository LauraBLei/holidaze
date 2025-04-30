import { Outlet } from 'react-router-dom';
import Footer from './Footer.tsx';
import Header from './Header.tsx';
import { LoginModal } from './login.tsx';
import { RegisterModal } from './register.tsx';

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center w-full flex-grow">
        <Outlet />
        <LoginModal />
        <RegisterModal />
      </main>
      <Footer />
    </div>
  );
};
