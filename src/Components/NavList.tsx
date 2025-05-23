import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CommonContext } from '../Types/context';
import { storedName } from '../Constants/constants';
import { HousePlus, LogOut, Moon, Sun, UserRound } from 'lucide-react';
import { useDarkMode } from '../context/darkModeContext';

/**
 * NavList component renders a responsive navigation menu for the Holidaze app.
 *
 * It adjusts based on the user's authentication and role (e.g., venue manager),
 * and includes links for profile access, venue management, login, and logout.
 *
 * - If a user is logged in, their avatar and name are shown.
 * - Venue managers see links to the manager dashboard and "New Venue" page.
 * - Non-authenticated users see a login option.
 * - The logout option clears user data from localStorage and reloads the page.
 *
 * Props:
 * @param {string} className - Additional Tailwind CSS classes to apply to the `ul` element.
 * @param {() => void} [onClick] - Optional click handler, typically used to close a mobile menu after a link is clicked.
 *
 * Context:
 * Uses `CommonContext` to access the `OpenLogin` function for triggering the login modal.
 *
 * Local Storage:
 * Reads from `localStorage.getItem('User')` to determine if a user is logged in and what role they have.
 *
 * @returns {JSX.Element} The rendered list of navigation items.
 */

interface NavListProps {
  className: string;
  onClick?: () => void;
}

export const NavList: React.FC<NavListProps> = ({ className, onClick }) => {
  const { OpenLogin } = useContext(CommonContext);
  const userData = localStorage.getItem('User');
  const user = userData ? JSON.parse(userData) : '';
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <ul className={className}>
      <li
        className={`flex font-primary items-center justify-center  cursor-pointer md:hidden ${user ? 'block' : 'hidden'} `}
        onClick={onClick}
      >
        <Link
          to={`/profile?username=${storedName}`}
          className={`scale-95 hover:scale-100 transition flex flex-col gap-2.5 mb-2 items-center text-sm md:text-base font-bold ${user ? 'block' : 'hidden'}`}
        >
          <div className="w-14 h-14 md:w-10 md:h-10 overflow-hidden rounded-full shadow-sm ">
            <img
              className="w-full h-full object-cover"
              src={user ? user.avatar.url : null}
              alt={user ? user.avatar.alt : null}
            />
          </div>
          <span className="md:hidden">{user.name}</span>
        </Link>
      </li>
      <li
        className={`scale-95 hover:scale-100 transition flex items-center cursor-pointer ${user.venueManager ? 'block' : 'hidden'} `}
        onClick={onClick}
      >
        <Link to="/create" className="text-sm md:text-base font-bold flex items-center gap-2.5 ">
          <HousePlus className="text-2xl" />
          New Venue
        </Link>
      </li>

      <li
        className={` scale-95 hover:scale-100 transition flex items-center gap-2.5 cursor-pointer ${user ? 'hidden' : 'block'} `}
        onClick={() => OpenLogin()}
      >
        <UserRound className="text-2xl" />
        <span className="text-sm md:text-base font-bold">Login</span>
      </li>

      <li
        className={`scale-95 hover:scale-100 transition items-center gap-1 cursor-pointer hidden md:flex ${user ? 'flex' : 'hidden'} `}
        onClick={onClick}
      >
        <Link
          to={`/profile?username=${storedName}`}
          className={`flex items-center gap-2.5 text-sm md:text-base font-bold `}
        >
          {user.avatar?.url && (
            <div className="w-14 h-14 md:w-10 md:h-10 overflow-hidden rounded-full">
              <img
                className="w-full h-full object-cover"
                src={user.avatar.url}
                alt={user.avatar.alt || 'User avatar'}
              />
            </div>
          )}
          <span className="md:hidden">{user.name}</span>
        </Link>
      </li>
      <li className="flex items-center">
        <button className="cursor-pointer" onClick={toggleDarkMode}>
          {darkMode ? <Moon /> : <Sun />}
        </button>
      </li>
      <li
        className={`scale-95 hover:scale-100 transition flex items-center gap-2.5 cursor-pointer ${user ? 'block' : 'hidden'} `}
        onClick={() => {
          localStorage.removeItem('User');
          window.location.href = '/';
        }}
      >
        <LogOut className="text-2xl" />
        <span className="text-sm md:text-base font-bold md:hidden">Log Out</span>
      </li>
    </ul>
  );
};
