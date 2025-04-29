import React, { useContext } from 'react';
import { BiSolidCalendarStar } from 'react-icons/bi';
import { BsHouseAddFill } from 'react-icons/bs';
import { IoPerson } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { CommonContext } from '../Types/context';

interface NavListProps {
  className: string;
  onClick?: () => void;
}

export const NavList: React.FC<NavListProps> = ({ className, onClick }) => {
  const { OpenLogin } = useContext(CommonContext);
  return (
    <ul className={className}>
      <li className="flex items-center gap-1 cursor-pointer" onClick={onClick}>
        <BiSolidCalendarStar className="text-lg md:text-2xl" />
        <Link to="/manager" className="text-sm md:text-base font-bold ">
          Manager
        </Link>
      </li>
      <li className="flex items-center gap-1 cursor-pointer" onClick={onClick}>
        <BsHouseAddFill className="text-lg md:text-2xl" />
        <Link to="/create" className="text-sm md:text-base font-bold ">
          New Venue
        </Link>
      </li>
      <li className="flex items-center gap-1 cursor-pointer" onClick={onClick}>
        <IoPerson className="text-lg md:text-2xl" />
        <Link to="/profile" className="text-sm md:text-base font-bold ">
          Profile
        </Link>
      </li>
      <li className="flex items-center gap-1 cursor-pointer" onClick={() => OpenLogin()}>
        <span className="text-sm md:text-base font-bold">Login</span>
      </li>
    </ul>
  );
};
