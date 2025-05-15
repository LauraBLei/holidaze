import loadingImage from '/loading-image.png';
import { Booking } from '../Types/common';
import { BiSolidStar } from 'react-icons/bi';
import { Link } from 'react-router-dom';

interface BookingCardProps {
  booking: Booking;
}

/**
 * BookingCard component displays a card for a booking, showing venue image, name, rating,
 * description, reservation dates, number of guests, and price per night.
 *
 * @component
 * @example
 * const booking = {
 *   dateFrom: "2025-06-10T00:00:00Z",
 *   dateTo: "2025-06-15T00:00:00Z",
 *   guests: 4,
 *   venue: {
 *     name: "Cozy Mountain Retreat",
 *     description: "A peaceful mountain getaway.",
 *     rating: 4.5,
 *     price: 150,
 *     media: [
 *       { url: "/path/to/image.jpg", alt: "Venue image" }
 *     ]
 *   }
 * };
 *
 * return <BookingCard booking={booking} />;
 *
 * @param {Object} props - Component props.
 * @param {Booking} props.booking - The booking object containing all relevant venue and reservation details.
 * @returns {JSX.Element} A card component displaying the booking details.
 */

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  return (
    <Link
      to={`/venues?id=${booking.venue.id}`}
      className="flex flex-col  md:max-w-[280px] w-full gap-[20px] cursor-pointer lg:hover:scale-105 transition duration-150"
    >
      <img
        className="cardImage h-[200px]  rounded-xl object-cover"
        src={booking.venue.media[0] ? booking.venue.media[0].url : loadingImage}
        alt={booking.venue.media[0] ? booking.venue.media[0].alt : 'Image not found'}
      />
      <div className="title-rating-container flex justify-between items-center">
        <h3 className=" h-[27px] w-[60%] rounded text-base font-bold"> {booking.venue.name} </h3>
        <div className="flex ratingWrapper gap-2 items-center">
          <BiSolidStar fill="#000000" stroke="#000000" />
          <p className="text-xs">{booking.venue.rating}</p>
        </div>
      </div>
      <p className=" w-full rounded text-sm line-clamp-3">{booking.venue.description}</p>

      <p className="text-sm">
        {new Date(booking.dateFrom).toLocaleDateString('en-GB')} <span>-</span>{' '}
        {new Date(booking.dateTo).toLocaleDateString('en-GB')}
      </p>

      <div className="flex justify-between items-center">
        <div className=" w-[35%] h-[27px] rounded text-sm font-bold">
          {booking.venue.price}$ / night
        </div>
        <p>{booking.guests} guest(s)</p>
      </div>
    </Link>
  );
};
