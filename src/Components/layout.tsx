import { Outlet } from 'react-router-dom';
import Footer from './Footer.tsx';
import Header from './Header.tsx';
import { AuthModal } from './auth.tsx';

/**
 * The Layout component serves as the main structure for the pages, wrapping the header, footer,
 * and authentication modal around the content of the page rendered by the `Outlet`.
 * It provides a common layout structure for all the routes in the application.
 *
 * @returns {JSX.Element} The rendered layout with the header, footer, and dynamic content.
 */

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
