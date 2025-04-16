import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <header></header>
      <main className='flex flex-col justify-center items-center'>
        {' '}
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};
