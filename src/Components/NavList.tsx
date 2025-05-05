import React, { useContext } from 'react';
import { BiSolidCalendarStar } from 'react-icons/bi';
import { BsHouseAddFill } from 'react-icons/bs';
import { IoPerson } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { CommonContext } from '../Types/context';
import { storedName } from '../Constants/constants';
import { LuLogOut } from 'react-icons/lu';

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
        className={`flex items-center gap-1 cursor-pointer md:hidden ${user ? 'block' : 'hidden'} `}
        onClick={onClick}
      >
        <Link
          to={`/profile?username=${storedName}`}
          className={`flex flex-col gap-2 mb-2 items-center text-sm md:text-base font-bold `}
        >
          <div className="w-10 md:w-10 md:h-10 overflow-hidden rounded-full">
            <img
              className="w-full h-full object-cover"
              src={user.avatar.url}
              alt={user.avatar.alt}
            />
          </div>
          <span className="md:hidden">{user.name}</span>
        </Link>
      </li>
      <li
        className={`flex items-center gap-1 cursor-pointer ${user.venueManager ? 'block' : 'hidden'}`}
        onClick={onClick}
      >
        <BiSolidCalendarStar className="text-2xl" />
        <Link to="/manager" className="text-sm md:text-base font-bold ">
          Manager
        </Link>
      </li>
      <li
        className={`flex items-center gap-1 cursor-pointer ${user.venueManager ? 'block' : 'hidden'} `}
        onClick={onClick}
      >
        <BsHouseAddFill className="text-2xl" />
        <Link to="/create" className="text-sm md:text-base font-bold ">
          New Venue
        </Link>
      </li>

      <li
        className={`flex items-center gap-1 cursor-pointer ${user ? 'hidden' : 'block'} `}
        onClick={() => OpenLogin()}
      >
        <IoPerson className="text-lg md:text-2xl" />
        <span className="text-sm md:text-base font-bold">Login</span>
      </li>
      <li
        className={` items-center gap-1 cursor-pointer hidden md:flex ${user ? 'block' : 'hidden'} `}
        onClick={onClick}
      >
        <Link
          to={`/profile?username=${storedName}`}
          className={`flex items-center gap-1 text-sm md:text-base font-bold `}
        >
          <div className="w-10 md:w-10 md:h-10 overflow-hidden rounded-full">
            <img
              className="w-full h-full object-cover"
              src={user.avatar.url}
              alt={user.avatar.alt}
            />
          </div>
          <span className="md:hidden">{user.name}</span>
        </Link>
      </li>
      <li
        className={`flex items-center gap-1 cursor-pointer ${user ? 'block' : 'hidden'} `}
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
