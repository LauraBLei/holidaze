import { IoIosStar } from 'react-icons/io';
import loadingImage from '/loading-image.png';

interface BookingCardProps {
  image: string;
  imageAlt: string;
  title: string;
  rating: number;
  description: string;
  reservationDate: string;
  guestAmount: number;
  price: number;
}

/**
 * BookingCard component displays a card for a booking with information such as the image, title, rating, description, reservation date, guest amount, and price.
 * The image is displayed as a placeholder if not provided.
 *
 * @component
 * @example
 * const booking = {
 *   image: 'path/to/image.jpg',
 *   imageAlt: 'Venue Image',
 *   title: 'Cozy Mountain Retreat',
 *   rating: 4.5,
 *   description: 'A beautiful retreat in the mountains, perfect for a peaceful getaway.',
 *   reservationDate: '2025-06-10 to 2025-06-15',
 *   guestAmount: 4,
 *   price: 150
 * };
 * return <BookingCard {...booking} />;
 *
 * @param {Object} props - Component props.
 * @param {string} props.image - The URL of the image to display.
 * @param {string} props.imageAlt - The alt text for the image.
 * @param {string} props.title - The title of the booking.
 * @param {number} props.rating - The rating of the venue (from 1 to 5).
 * @param {string} props.description - A short description of the venue.
 * @param {string} props.reservationDate - The date range of the reservation.
 * @param {number} props.guestAmount - The number of guests for the reservation.
 * @param {number} props.price - The price per night for the venue.
 *
 * @returns {JSX.Element} A card component displaying the booking details.
 */

export const BookingCard: React.FC<BookingCardProps> = ({
  image,
  imageAlt,
  title,
  rating,
  description,
  reservationDate,
  guestAmount,
  price,
}) => {
  return (
    <article className="flex flex-col  md:max-w-[280px] w-full gap-[20px] animate-pulse">
      <img
        className="cardImage h-[200px]  rounded-xl object-cover"
        src={image ? image : loadingImage}
        alt={imageAlt}
      />
      <div className="title-rating-container flex justify-between items-center">
        <h3 className=" h-[27px] w-[60%] rounded text-base font-bold"> {title} </h3>
        <div className="flex ratingWrapper gap-2 items-center">
          <IoIosStar fill="#000000" stroke="#000000" />
          <p className="text-xs">{rating}</p>
        </div>
      </div>
      <p className=" w-full rounded text-sm line-clamp-3">{description}</p>
      <div className="flex date-and-guests-wrapper">
        <p>{reservationDate}</p>
        <p>{guestAmount} guests</p>
      </div>
      <div className=" w-[35%] h-[27px] rounded text-sm font-bold">{price}$ / night</div>
    </article>
  );
};
