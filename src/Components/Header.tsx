import { BiSolidCalendarStar } from 'react-icons/bi';
import { BsHouseAddFill } from 'react-icons/bs';
import { IoPerson } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full">
      <nav className="flex item-center justify-between mx-5 md:mx-10">
        <Link to="/" className="cursor-pointer">
          <img src="/holidaze-logo.png" alt="text" />
        </Link>
        <ul className="flex gap-6 items-center ">
          <li className="flex items-center gap-1">
            <BiSolidCalendarStar className="text-2xl" />
            <Link to="/manager" className="text-base font-bold cursor-pointer">
              Manager
            </Link>
          </li>
          <li className="flex items-center gap-1">
            <BsHouseAddFill className="text-2xl" />
            <Link to="/create" className="text-base font-bold cursor-pointer">
              New Venue
            </Link>
          </li>
          <li className="flex items-center gap-1">
            <IoPerson className="text-2xl" />
            <Link to="/profile" className="text-base font-bold cursor-pointer">
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
