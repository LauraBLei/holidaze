import loadingImage from '/loading-image.png';
import { Venue } from '../Types/common';
import { IoIosStar } from 'react-icons/io';
import { Link } from 'react-router-dom';

interface VenueCardProps {
  venue: Venue;
}

export const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  console.log('venue', venue);

  return (
    <Link to={`/venues?id=$${venue.id}`}>
      <article className="flex flex-col  md:max-w-[280px] w-full gap-[20px]">
        <img
          className="cardImage h-[200px]  rounded-xl object-cover"
          src={venue.media[0]?.url ?? loadingImage}
          alt={venue.media[0]?.alt ?? 'image not found'}
        />
        <div className="title-rating-container flex justify-between items-center">
          <h3 className=" h-[27px] w-[60%] rounded text-base font-bold"> {venue.name} </h3>
          <div className="flex ratingWrapper gap-2 items-center">
            <IoIosStar fill="#000000" stroke="#000000" />
            <p className="text-xs">{venue.rating}</p>
          </div>
        </div>
        <p className=" w-full rounded text-sm line-clamp-3">{venue.description}</p>
        <div className=" w-[35%] h-[27px] rounded text-sm font-bold">{venue.price}$ / night</div>
      </article>
    </Link>
  );
};
