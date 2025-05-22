import loadingImage from '/loading-image.png';
import { Booking } from '../Types/common';
import { Star, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CommonContext } from '../Types/context';
import { deleteBooking } from '../API/booking/delete';

interface BookingCardProps {
  booking: Booking;
  oldBooking: boolean;
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

export const BookingCard: React.FC<BookingCardProps> = ({ booking, oldBooking }) => {
  const dateFrom = new Date(booking.dateFrom);
  const dateTo = new Date(booking.dateTo);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const numberOfNights = Math.max(
    Math.ceil((dateTo.getTime() - dateFrom.getTime()) / millisecondsPerDay),
    1,
  );
  const totalCost = booking.venue.price * numberOfNights;
  const { confirm } = useContext(CommonContext);
  const onDeleteBooking = () => {
    confirm({
      message: 'Are you sure you want to delete this Booking?',
      onConfirm: handleDeleteBooking,
    });
  };

  const handleDeleteBooking = () => {
    deleteBooking(booking.id);
    window.location.reload();
  };

  return (
    <Link
      to={`/venues?id=${booking.venue.id}`}
      className="lg:hover:scale-105 transition duration-150"
    >
      <article className="flex flex-col h-full w-full">
        <div className="w-full h-52 rounded-xl overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={booking.venue.media[0] ? booking.venue.media[0].url : loadingImage}
            alt={booking.venue.media[0] ? booking.venue.media[0].alt : 'Image not found'}
          />
        </div>

        <div className="flex flex-col min-h-[160px] gap-5">
          <div className="title-rating-container flex justify-between items-center gap-8 mt-3">
            <h3 className="text-base font-bold line-clamp-1"> {booking.venue.name} </h3>
            <div className="flex gap-2 items-center">
              <Star fill="#000000" stroke="#000000" className="h-4" />
              <p className="text-sm">{booking.venue.rating}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between h-full gap-5">
            <p className=" w-full rounded text-sm line-clamp-1">{booking.venue.description}</p>
            <p className="text-sm">
              {new Date(booking.dateFrom).toLocaleDateString('en-GB')} <span>-</span>{' '}
              {new Date(booking.dateTo).toLocaleDateString('en-GB')}
            </p>

            <div className="flex justify-between items-center mt-auto">
              <span className="text-sm font-bold">{booking.venue.price}$ / night</span>
              <p>{booking.guests} guest(s)</p>
            </div>
            <div className="text-sm font-semibold flex justify-between">
              <span>Total: {totalCost}$</span>
              <span>
                {numberOfNights} night{numberOfNights > 1 ? 's' : ''}
              </span>
              {!oldBooking && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDeleteBooking();
                  }}
                >
                  <Trash2 className="h-4 transition text-black hover:text-error-red cursor-pointer" />
                </button>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
