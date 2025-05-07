import React, { useEffect, useState } from 'react';
import fetchProfile from '../API/profile/fetchProfile';
import { Profile } from '../Types/common';
import { Venue } from '../Types/common';
import { Booking } from '../Types/common';
import { VenueCard } from './VenueCard';
import { BiSolidCalendarStar } from 'react-icons/bi';
import { FaUserEdit } from 'react-icons/fa';
import { UpdateProfileModal } from './updateProfile';

interface BuildUserProps {
  profile: Profile;
}

const storedUser = localStorage.getItem('User');
const storedUserData = JSON.parse(storedUser || '{}');
const storedUserName = storedUserData.name;

export const BuildUser: React.FC<BuildUserProps> = ({ profile }) => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProfile();
      if (data?.venues && data?.bookings) {
        setVenues(data.venues);
        setBookings(data.bookings);
      } else if (data?.bookings) {
        setBookings(data.bookings);
      } else if (data?.venues) {
        setVenues(data.venues);
      } else {
        console.warn('No venues found on profile');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-screen flex flex-col items-center gap-14 md:gap-20 lg:gap-24">
      <div className="max-w-[1440px] w-full flex flex-col items-center md:items-start">
        <img
          src={profile.banner.url}
          className="skeleton-banner bg-[#C4C4C4] w-full h-[250px] md:h-[360px] object-cover"
          alt={profile.banner.alt}
        />
        <div className="flex flex-col md:flex-row items-center w-full gap-5 md:gap-0">
          <img
            src={profile.avatar.url}
            alt={profile.avatar.alt}
            className="skeleton-avatar flex items-center object-cover justify-center overflow-hidden rounded-full w-full h-[136px] max-w-[136px] md:h-[170px] md:max-w-[170px] lg:h-[236px] lg:max-w-[236px] mt-[-68px] md:mt-[-85px] lg:mt-[-125px] md:ml-[50px] lg:ml-[75px]"
          />
          <div className="skeleton-bio flex flex-col justify-center w-full">
            <div className="flex flex-col gap-4 justify-center mx-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <h1 className="text-lg md:text-2xl rounded">{profile.name}</h1>
                  {profile.venueManager ? (
                    <BiSolidCalendarStar className="text-lg md:text-2xl" />
                  ) : null}
                </div>
                {profile.name === storedUserName && (
                  <div
                    onClick={() => setShowUpdateModal(true)}
                    className="edit-container items-center flex gap-2.5 cursor-pointer"
                  >
                    <p>Edit User</p>
                    <FaUserEdit className="text-lg md:text-2xl" />
                  </div>
                )}

                {/* Mount modal component */}
                <UpdateProfileModal
                  isOpen={showUpdateModal}
                  onClose={() => setShowUpdateModal(false)}
                />
              </div>
              <p className="text-base md:text-lg rounded italic">
                {profile.bio ? profile.bio : 'This user has no bio yet'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center flex-col">
        {venues.length > 0 ? (
          <h2 className="font-bold text-lg md:text-2xl ">Venues By User </h2>
        ) : null}
        <div className="max-w-[850px] w-full h-full grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-5 md:gap-8 lg:gap-10 mx-5">
          {venues.length > 0
            ? venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)
            : null}
        </div>
        {bookings.length > 0 ? (
          <h2 className="font-bold text-lg md:text-2xl ">Bookings by user </h2>
        ) : null}
        <div className="max-w-[850px] w-full h-full grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-5 md:gap-8 lg:gap-10 mx-5">
          {bookings.length > 0
            ? bookings.map((booking) => <VenueCard key={booking.id} venue={booking.venue} />)
            : null}
        </div>
      </div>
    </div>
  );
};
