import loadingImage from '/loading-image.png';
import { Venue } from '../Types/common';
import { IoIosStar } from 'react-icons/io';
import { Link } from 'react-router-dom';

interface VenueCardProps {
  venue: Venue;
}

export const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  return (
    <Link to={`/venues?id=${venue.id}`}>
      <article className="flex flex-col h-full md:max-w-[280px] w-full">
        <div className="w-full h-52 rounded-xl overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={venue.media[0]?.url ?? loadingImage}
            alt={venue.media[0]?.alt ?? 'image not found'}
          />
        </div>
        <div className="flex flex-col min-h-[160px] gap-5">
          <div className="title-rating-container flex justify-between items-center gap-8 mt-3">
            <h3 className="text-base font-bold line-clamp-1"> {venue.name} </h3>
            <div className="flex gap-2 items-center">
              <IoIosStar fill="#000000" stroke="#000000" />
              <p className="text-sm">{venue.rating}</p>
            </div>
          </div>
          <div className="flex flex-col justify-between h-full">
            <p className="text-sm line-clamp-3">{venue.description}</p>
            <div className="mt-auto text-sm font-bold">{venue.price}$ / night</div>
          </div>
        </div>
      </article>
    </Link>
  );
};
