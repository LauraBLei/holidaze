import { BsX } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from '/holidaze-logo.png';
import { useState } from 'react';
import { NavList } from './NavList';
import { RxHamburgerMenu } from 'react-icons/rx';

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const userData = localStorage.getItem('User');
  const user = userData ? JSON.parse(userData) : '';

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

  return (
    <header className="flex w-full h-[90px] md:h-[120px]">
      <nav className="flex items-center justify-between w-full mx-5 md:mx-10">
        <Link to="/" className="cursor-pointer">
          <img src={logo} alt="holidaze-logo" className="h-12 md:h-20" />
        </Link>

        <div className="hidden md:flex">
          <NavList className={`flex ${user ? 'gap-10' : ''}`} />
        </div>

        <div className="md:hidden self-center">
          <RxHamburgerMenu size={24} className="cursor-pointer" onClick={toggleMenu} />
        </div>

        {(isMenuOpen || animateOut) && (
          <div
            className={`${
              animateOut ? 'animate-slide-bounce-out' : 'animate-slide-in'
            } md:hidden absolute right-0 top-0 max-w-96 w-full h-96 bg-[var(--color-brand-orange)] shadow-lg p-2 z-50 flex flex-col items-end rounded-bl-full`}
          >
            <div className="flex w-full justify-end pt-3">
              <div className="flex w-full items-center justify-center">
                <NavList
                  className={`flex ${user ? 'flex flex-col gap-4 mt-3 mr-[-80px]' : 'mt-16 mr-[-80px]'}`}
                  onClick={toggleMenu}
                />
              </div>
              <BsX
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
