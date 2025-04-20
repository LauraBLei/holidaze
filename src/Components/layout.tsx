import { Outlet } from 'react-router-dom';
import Footer from './Footer.tsx';

export const Layout = () => {
  return (
    <>
      <header></header>
      <main className="flex flex-col justify-center items-center w-full">
        {' '}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
