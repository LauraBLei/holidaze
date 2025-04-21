import { Outlet } from 'react-router-dom';
import Footer from './Footer.tsx';
import Header from './Header.tsx';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center w-full">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
