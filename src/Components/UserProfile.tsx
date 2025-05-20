import React, { useEffect, useState } from 'react';
import { Booking, Profile, Venue } from '../Types/common';
import { VenueCard } from './VenueCard';
import { BiSolidCalendarStar } from 'react-icons/bi';
import { EditProfile } from './EditProfile';
import { Link } from 'react-router-dom';
import { BookingCard } from './BookingCard';
import { storedName, storedVenueManager } from '../Constants/constants';
import { UserRoundPen } from 'lucide-react';
import { readUserBookings } from '../API/booking/userBooking';
import { Pagination } from './pagination';
import { ReadUserVenues } from '../API/venues/read';

interface BuildUserProps {
  profile: Profile;
}

/**
 * The BuildUser component displays the user's profile information, including the profile picture, banner,
 * bio, venues, and bookings. It allows the user to edit their profile if it is their own account.
 *
 * @param {Object} props - The component's props.
 * @param {Profile} props.profile - The profile data to be displayed.
 *
 * @returns {JSX.Element} The rendered profile page with user details, venues, and bookings.
 */

export const BuildUser: React.FC<BuildUserProps> = ({ profile }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingPage, setBookingPage] = useState<number>(1);
  const [bookingsTotalCount, setBookingsTotalCount] = useState(0);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [venuePage, setVenuePage] = useState<number>(1);
  const [venueTotalCount, setVenueTotalCount] = useState<number>(0);
  const limit = 8;
  const bookingTotalPages = Math.ceil(bookingsTotalCount / limit);
  const venueTotalPages = Math.ceil(venueTotalCount / limit);
  const bookingHasNext = bookingPage < bookingTotalPages;
  const bookingHasPrevious = bookingPage > 1;
  const venueHasNext = venuePage < venueTotalPages;
  const venueHasPrevious = venuePage > 1;

  useEffect(() => {
    readUserBookings({
      page: bookingPage,
      limit: limit,
      setBookings,
      setTotalCount: setBookingsTotalCount,
    });
  }, [bookingPage]);

  useEffect(() => {
    ReadUserVenues({
      page: venuePage,
      limit: limit,
      setVenues: setVenues,
      setTotalCount: setVenueTotalCount,
    });
  }, [venuePage]);

  return (
    <div className="w-full flex flex-col items-center gap-14 md:gap-20 lg:gap-24 font-primary">
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
                  {storedVenueManager ? (
                    <BiSolidCalendarStar className="text-lg md:text-2xl" />
                  ) : null}
                </div>
                {profile.name === storedName && (
                  <div
                    onClick={() => setShowUpdateModal(true)}
                    className="edit-container items-center flex gap-2.5 cursor-pointer"
                  >
                    <p>Edit User</p>
                    <UserRoundPen className="text-lg md:text-2xl" />
                  </div>
                )}
                <EditProfile isOpen={showUpdateModal} onClose={() => setShowUpdateModal(false)} />
              </div>
              <p className="text-base md:text-lg rounded text-gray-500 italic">
                {profile.bio ? profile.bio : 'This user has no bio yet'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center max-w-[1440px] flex-col gap-10 px-5 2xl:px-0">
        <section id="UserVenues" className="w-full">
          <h2 className="font-bold text-lg md:text-2xl self-start border-b-[1px] border-brand-grey mb-5 py-2">
            {profile.name == storedName ? 'Your venues' : 'Venues By User'}{' '}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 w-full">
            {venues.length > 0 ? (
              venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)
            ) : (
              <p className="text-gray-500 italic">Oops! No information here yet!</p>
            )}
          </div>{' '}
          {venueTotalPages > 1 && (
            <Pagination
              page={venuePage}
              setPage={setVenuePage}
              hasNext={venueHasNext}
              hasPrevious={venueHasPrevious}
              totalPages={venueTotalPages}
            />
          )}
        </section>
        <section
          id="Bookings"
          className={`w-full ${profile.name === storedName ? 'grid' : 'hidden'}`}
        >
          <h2
            className={`border-b-[1px] border-brand-grey mb-5 py-2 font-bold text-lg md:text-2xl self-start ${profile.name === storedName ? 'grid' : 'hidden'}`}
          >
            Your Bookings
          </h2>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 w-full ${profile.name === storedName ? 'grid' : 'hidden'}`}
          >
            {bookings.length > 0 ? (
              bookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
            ) : (
              <p className="text-gray-500 italic">Oops! No information here yet!</p>
            )}
          </div>
          {bookingTotalPages > 1 && (
            <Pagination
              page={bookingPage}
              setPage={setBookingPage}
              hasNext={bookingHasNext}
              hasPrevious={bookingHasPrevious}
              totalPages={bookingTotalPages}
            />
          )}
        </section>
        <section id="PrevBookings" className="w-full">
          <h2
            className={`border-b-[1px] border-brand-grey mb-5 py-2 font-bold text-lg md:text-2xl self-start ${profile.name === storedName ? 'grid' : 'hidden'}`}
          >
            Your Previous Bookings
          </h2>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 w-full ${profile.name === storedName ? 'grid' : 'hidden'}`}
          >
            {profile.bookings.length > 0 ? (
              [...profile.bookings]
                .filter((booking) => new Date(booking.dateTo) < new Date()) // Only past bookings
                .sort((a, b) => new Date(b.dateFrom).getTime() - new Date(a.dateFrom).getTime()) // Sort newest first
                .map((booking) => <BookingCard key={booking.id} booking={booking} />)
            ) : (
              <p className="text-gray-500 italic">Oops! No information here yet!</p>
            )}
          </div>
        </section>
        {!(profile.venues.length || profile.bookings.length) && (
          <Link to="/" className="button text-center mt-10">
            Back To Homepage
          </Link>
        )}
      </div>
    </div>
  );
};
