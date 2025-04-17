import { IoIosStar } from 'react-icons/io';
import loadingImage from '/loading-image.png';

interface VenueCardProps {
  image: string;
  imageAlt: string;
  title: string;
  rating: number;
  description: string;
  reservationDate: string;
  guestAmount: number;
  price: number;
}

export const BookingCard: React.FC<VenueCardProps> = ({
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
