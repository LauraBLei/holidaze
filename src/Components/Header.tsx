import { BsX } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from '/holidaze-logo.png';
import { useState } from 'react';
import { NavList } from './NavList';
import { RxHamburgerMenu } from 'react-icons/rx';

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setAnimateOut(true);
      setTimeout(() => {
        setMenuOpen(false);
        setAnimateOut(false);
      }, 400); // match animation duration
    } else {
      setMenuOpen(true);
    }
  };

  return (
    <header className="w-full py-5">
      <nav className="flex item-center justify-between mx-5 md:mx-10 ">
        <Link to="/" className="cursor-pointer">
          <img src={logo} alt="holidaze-logo" className="h-12 md:h-20" />
        </Link>

        <div className="hidden md:flex">
          <NavList className="flex gap-10" />
        </div>

        <div className="md:hidden self-center">
          <RxHamburgerMenu className="text-2xl cursor-pointer" onClick={toggleMenu} />
        </div>

        {(isMenuOpen || animateOut) && (
          <div
            className={`${
              animateOut ? 'animate-slide-bounce-out' : 'animate-slide-in'
            } md:hidden absolute right-0 top-0 max-w-96 w-full h-96 bg-[var(--color-brand-orange)] shadow-lg p-2 z-50 flex flex-col items-end rounded-bl-full`}
          >
            <div className="flex pt-2.5">
              <BsX
                className="self-end text-3xl mb-5 cursor-pointer mr-2 mt-2"
                onClick={toggleMenu}
              />
            </div>
            <NavList className="flex flex-col gap-4 pr-20" onClick={toggleMenu} />
          </div>
        )}
      </nav>
    </header>
  );
}
