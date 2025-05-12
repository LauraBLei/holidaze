import { useContext, useEffect, useState } from 'react';
import LoadingVenuePage from '../Components/loading/loadingVenuePage';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ReadVenue } from '../API/venues/read';
import { Venue } from '../Types/common';
import { GalleryComponent } from '../Components/gallery';
import { userInfo } from '../utilities/localstorage';
import StarRating from '../Components/rating';
import { FaCheck, FaDog, FaLocationDot, FaWifi } from 'react-icons/fa6';
import { Description } from '../Components/textCrop';
import { FaParking, FaTimes } from 'react-icons/fa';
import { GiKnifeFork } from 'react-icons/gi';
import { BookingForm } from '../Components/booking';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { CommonContext } from '../Types/context';
import { deleteVenue } from '../API/venues/delete';

export const VenuePage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') ?? ``;
  const [venue, setVenue] = useState<Venue>();
  const user = userInfo();
  const { OpenLogin, confirm } = useContext(CommonContext);
  const navigate = useNavigate();

  useEffect(() => {
    ReadVenue(id, setVenue);
  }, [id]);

  if (!venue) {
    return <LoadingVenuePage />;
  }

  const handleDeleteClick = () => {
    confirm({
      message: 'Are you sure you want to delete this venue?',
      onConfirm: handleDeleteVenue,
    });
  };

  const handleDeleteVenue = () => {
    deleteVenue(id);
    navigate('/');
  };
  console.log(venue.bookings);

  return (
    <div className="w-full max-w-[1600px] px-5">
      <div className="font-primary w-full h-full  flex flex-wrap lg:flex-nowrap justify-center md:justify-evenly lg:justify-between gap-5 max-w-[1600px]">
        <div className="max-w-[700px] w-full mb-5 md:mb-10">
          <GalleryComponent media={venue.media ? venue.media : []} />
          <div className="my-10">
            <p className="text-2xl">{venue.price} NOK</p>
            <p>Per night</p>
          </div>
          <div
            className={`w-full ${venue.owner && user.name === venue.owner.name ? 'hidden' : 'block'}`}
          >
            <BookingForm
              maxGuests={venue.maxGuests ? venue.maxGuests : 0}
              bookings={venue.bookings ? venue.bookings : []}
              id={venue.id ? venue.id : ''}
            />
            <div className={`text-center my-10 ${!user ? 'block' : 'hidden'}`}>
              <button
                className="headlineTwo cursor-pointer hover:scale-100 scale-95 transition"
                onClick={() => OpenLogin()}
              >
                Login or register to book this venue!
              </button>
            </div>
            <div className="my-5">
              <p id="bookingErrorDates" className="w-full p-3 rounded-xl bg-error-red hidden">
                These dates are already booked. Please select different dates.
              </p>
              <p id="bookingSuccess" className="w-full p-3 rounded-xl bg-error-green hidden">
                Booking Successful!
              </p>
              <p id="bookingError" className="w-full p-3 rounded-xl bg-error-red hidden">
                Something went wrong, try again later.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full md:max-w-[700px] md:min-w-[350px] px-2">
          <div className="flex justify-between items-center flex-wrap gap-10">
            <h1 className="headlineOne">{venue.name}</h1>

            <div
              className={`flex gap-5 md:gap-10 font-bold ${venue.owner && user && user.name === venue.owner.name ? 'block' : 'hidden'}`}
            >
              <Link
                to="/edit"
                className="flex gap-2 items-center scale-95 hover:scale-100 transition"
                onClick={() => localStorage.setItem('editVenue', JSON.stringify(venue))}
              >
                <span>Edit Venue</span>
                <MdEdit />
              </Link>
              <button
                onClick={() => handleDeleteClick()}
                className="flex gap-2 items-center cursor-pointer scale-95 hover:scale-100 transition"
              >
                <span>Delete Venue</span> <MdDeleteForever />
              </button>
            </div>
          </div>
          <p>{venue.maxGuests} Guests</p>
          <StarRating rating={venue.rating ? venue.rating : 1} />

          {userInfo() ? (
            <Link
              to={`/profile?username=${venue.owner ? venue.owner.name : ''}`}
              className="flex items-center gap-2 border-y-2 border-brand-grey py-2 cursor-pointer"
            >
              <div className="w-[41px] h-[41px] rounded-full overflow-hidden">
                <img
                  className="object-cover w-full h-full"
                  src={venue.owner ? venue.owner.avatar.url : ''}
                  alt={venue.owner ? venue.owner.avatar.alt : ''}
                />
              </div>
              <p>{venue.owner ? venue.owner.name : ''}</p>
            </Link>
          ) : (
            <div
              className="flex items-center gap-2 border-y-2 border-brand-grey py-2 cursor-pointer"
              onClick={() => {
                window.alert('You need to be logged in to view user profile');
              }}
            >
              <div className="w-[41px] h-[41px] rounded-full overflow-hidden">
                <img
                  className="object-cover w-full h-full"
                  src={venue.owner ? venue.owner.avatar.url : ''}
                  alt={venue.owner ? venue.owner.avatar.alt : ''}
                />
              </div>
              <p>{venue.owner ? venue.owner.name : ''}</p>
            </div>
          )}

          <div className="flex gap-2 items-center border-b-2 border-brand-grey py-3">
            <FaLocationDot className="w-[25px] h-full" />
            <p>
              {venue.location.address}, {venue.location.zip}, {venue.location.city},{' '}
              {venue.location.country}
            </p>
          </div>
          <div className="py-5 border-b-2 border-brand-grey">
            <Description text={venue.description} />
          </div>
          <div>
            <h2 className="headlineTwo font-bold mb-5">What this place offers</h2>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex gap-2 items-center">
                <AmenityItem value={venue.meta.pets} />
                <FaDog className="w-[25px] md:w-[30px] h-auto" /> <span>Pets</span>
              </div>
              <div className="flex gap-2 items-center">
                <AmenityItem value={venue.meta.wifi} />
                <FaWifi className="w-[25px] md:w-[30px] h-auto" /> <span>Free Wifi</span>
              </div>

              <div className="flex gap-2 items-center">
                <AmenityItem value={venue.meta.parking} />
                <FaParking className="w-[25px] md:w-[30px]h-auto" /> <span>Parking</span>
              </div>
              <div className="flex gap-2 items-center">
                <AmenityItem value={venue.meta.breakfast} />
                <GiKnifeFork className="w-[25px] md:w-[30px] h-auto" /> <span>BreakFast</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {user.name === venue.owner?.name && (
        <section className="2-full mt-7 flex flex-col gap-5">
          <h2 className="headlineTwo ">Bookings</h2>
          <div className="flex flex-wrap gap-5 w-full">
            {venue.bookings
              ?.slice()
              .sort((a, b) => new Date(b.dateFrom).getTime() - new Date(a.dateFrom).getTime()) // newest to oldest
              .map((booking) => {
                return (
                  <div
                    className="border-[1px] border-brand-grey px-5 py-2 w-full rounded-md gap-2 flex flex-col flex-1/4 min-w-[250px] font-primary"
                    key={booking.id + 1}
                  >
                    <div className="flex">
                      {new Date(booking.dateFrom).toLocaleDateString('en-GB')} <span>-</span>{' '}
                      {new Date(booking.dateTo).toLocaleDateString('en-GB')}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <div className="w-11 h-11 rounded-full overflow-hidden">
                          <img
                            className="w-full h-full object-cover"
                            src={booking.customer.avatar.url}
                            alt={booking.customer.avatar.alt}
                          />
                        </div>
                        <p>{booking.customer.name}</p>
                      </div>
                      <div className="flex gap-2">
                        <span>Guests:</span>
                        {booking.guests}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      )}
    </div>
  );
};

interface AmenityItemProps {
  value: boolean;
}

export const AmenityItem = ({ value }: AmenityItemProps) => {
  return (
    <div>
      {value ? (
        <FaCheck className="w-[20px] md:w-[25px] h-auto text-black" />
      ) : (
        <FaTimes className="w-[20px] md:w-[25px] h-auto text-black" />
      )}
    </div>
  );
};
