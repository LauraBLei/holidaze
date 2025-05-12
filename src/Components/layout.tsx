import { Outlet } from 'react-router-dom';
import Footer from './Footer.tsx';
import Header from './Header.tsx';
import { AuthModal } from './auth.tsx';

export const Layout = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <AuthModal />
      <Header />
      <main className="flex flex-col items-center w-full flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
