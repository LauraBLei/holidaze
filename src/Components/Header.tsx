import { BsX } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import logo from '/holidaze-logo.png';
import { useState } from 'react';
import { NavList } from './NavList';
import { RxHamburgerMenu } from 'react-icons/rx';

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <header className="w-full py-5">
      <nav className="flex item-center justify-between mx-5 md:mx-10 ">
        <Link to="/" className="cursor-pointer">
          <img src={logo} alt="holidaze-logo" className="h-12 md:h-20" />
        </Link>

        <div className="hidden md:flex">
          <NavList className="flex gap-5" />
        </div>

        <div className="md:hidden self-center">
          <RxHamburgerMenu className="text-2xl cursor-pointer" onClick={toggleMenu} />
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-0 right-0 max-w-96 w-full h-96 bg-[var(--color-brand-orange)] shadow-lg p-5 z-50 flex flex-col items-end rounded-bl-full">
            <div className="flex pt-2.5">
              <BsX className="self-end text-3xl mb-5 cursor-pointer" onClick={toggleMenu} />
            </div>
            <NavList className=" flex flex-col gap-4 pr-10" onClick={toggleMenu} />
          </div>
        )}
      </nav>
    </header>
  );
}
