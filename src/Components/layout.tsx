import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <header></header>
      <main className='w-full'>
        {' '}
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};
