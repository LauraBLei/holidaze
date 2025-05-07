import React, { useContext } from 'react';
import { BiSolidCalendarStar } from 'react-icons/bi';
import { BsHouseAddFill } from 'react-icons/bs';
import { IoPerson } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { CommonContext } from '../Types/context';
import { storedName } from '../Constants/constants';
import { LuLogOut } from 'react-icons/lu';

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
  return (
    <ul className={className}>
      <li
        className={`flex items-center  cursor-pointer md:hidden ${user ? 'block' : 'hidden'} `}
        onClick={onClick}
      >
        <Link
          to={`/profile?username=${storedName}`}
          className={`scale-95 hover:scale-100 transition flex flex-col gap-2.5 mb-2 items-center text-sm md:text-base font-bold ${user ? 'block' : 'hidden'}`}
        >
          <div className="w-10 md:w-10 md:h-10 overflow-hidden rounded-full">
            <img
              className="w-full h-full object-cover"
              src={user ? user.avatar.url : ''}
              alt={user ? user.avatar.alt : ''}
            />
          </div>
          <span className="md:hidden">{user.name}</span>
        </Link>
      </li>
      <li
        className={`flex scale-95 hover:scale-100 transition items-center gap-2.5 cursor-pointer ${user.venueManager ? 'block' : 'hidden'}`}
        onClick={onClick}
      >
        <BiSolidCalendarStar className="text-2xl" />
        <Link to="/manager" className="text-sm md:text-base font-bold ">
          Manager
        </Link>
      </li>
      <li
        className={`scale-95 hover:scale-100 transition flex items-center gap-2.5 cursor-pointer ${user.venueManager ? 'block' : 'hidden'} `}
        onClick={onClick}
      >
        <BsHouseAddFill className="text-2xl" />
        <Link to="/create" className="text-sm md:text-base font-bold ">
          New Venue
        </Link>
      </li>

      <li
        className={` scale-95 hover:scale-100 transition flex items-center gap-2.5 cursor-pointer ${user ? 'hidden' : 'block'} `}
        onClick={() => OpenLogin()}
      >
        <IoPerson className="text-lg md:text-2xl" />
        <span className="text-sm md:text-base font-bold">Login</span>
      </li>
      <li
        className={`scale-95 hover:scale-100 transition items-center gap-1 cursor-pointer hidden md:flex ${user ? 'block' : 'hidden'} `}
        onClick={onClick}
      >
        <Link
          to={`/profile?username=${storedName}`}
          className={`flex items-center gap-2.5 text-sm md:text-base font-bold `}
        >
          <div className="w-10 md:w-10 md:h-10 overflow-hidden rounded-full">
            <img
              className="w-full h-full object-cover"
              src={user ? user.avatar.url : ''}
              alt={user ? user.avatar.alt : ''}
            />
          </div>
          <span className="md:hidden">{user.name}</span>
        </Link>
      </li>
      <li
        className={`scale-95 hover:scale-100 transition flex items-center gap-2.5 cursor-pointer ${user ? 'block' : 'hidden'} `}
        onClick={() => {
          localStorage.removeItem('User');
          window.location.reload();
        }}
      >
        <LuLogOut className="text-2xl md:text-2xl" />
        <span className="text-sm md:text-base font-bold md:hidden">Log Out</span>
      </li>
    </ul>
  );
};
