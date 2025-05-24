import { Link } from 'react-router-dom';
import logoLight from '/logo-light.png';
import logoDark from '/logo-dark.png';
import { useEffect, useRef, useState } from 'react';
import { NavList } from './NavList';
import { Menu, X } from 'lucide-react';
import { useDarkMode } from '../context/darkModeContext';

/**
 * Header component displays the website's navigation, logo, and a hamburger menu for mobile view.
 * It toggles between an open and closed menu state on mobile when the hamburger icon is clicked.
 * It also adapts the navigation items based on the user's authentication status.
 *
 * @returns {JSX.Element} The rendered header component with navigation options.
 */
export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const userData = localStorage.getItem('User');
  const user = userData ? JSON.parse(userData) : '';
  const menuRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useDarkMode();

  const toggleMenu = () => {
    if (isMenuOpen) {
      setAnimateOut(true);
      setTimeout(() => {
        setMenuOpen(false);
        setAnimateOut(false);
      }, 400);
    } else {
      setMenuOpen(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (isMenuOpen) toggleMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="flex w-full h-[90px] md:h-[120px] dark:text-white">
      <nav className="flex items-center justify-between w-full mx-5 md:mx-10 font-primary">
        <Link to="/" className="cursor-pointer md:hover:scale-105 transition">
          {darkMode ? (
            <img src={logoDark} alt="holidaze-logo" className="h-12 md:h-20" />
          ) : (
            <img src={logoLight} alt="holidaze-logo" className="h-12 md:h-20" />
          )}
        </Link>

        <div className="hidden md:flex">
          <NavList className={`flex gap-5 items-center ${user ? 'gap-10' : ''}`} />
        </div>

        <div className="md:hidden self-center">
          <Menu size={24} className="cursor-pointer" onClick={toggleMenu} />
        </div>

        {(isMenuOpen || animateOut) && (
          <div
            ref={menuRef}
            className={`${
              animateOut ? 'animate-slide-bounce-out' : 'animate-slide-in'
            } md:hidden absolute right-0 top-0 max-w-96 w-full h-96 bg-[var(--color-brand-orange)] shadow-lg p-2 z-50 flex flex-col items-end rounded-bl-full`}
          >
            <div className="flex w-full justify-end pt-4 dark:text-black">
              <div className="flex w-full items-center justify-center">
                <NavList
                  className={`flex ${user ? 'flex flex-col gap-4 mt-3 mr-[-80px]' : 'mt-16 mr-[-80px] flex-col gap-4'}`}
                  onClick={toggleMenu}
                />
              </div>
              <X
                className="self-start text-3xl mb-5 cursor-pointer mr-2 mt-2"
                onClick={toggleMenu}
              />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
