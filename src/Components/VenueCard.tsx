import loadingImage from '/loading-image.png';
import { Venue } from '../Types/common';
import { Link, useLocation } from 'react-router-dom';
import { Star } from 'lucide-react';
import { storedName } from '../Constants/constants';
import { breakWords } from '../utilities/breakWords';

interface VenueCardProps {
  venue: Venue;
}
/**
 * The VenueCard component displays a card with information about a venue, including an image, name, rating,
 * description, and price per night. The card links to the venue's details page.
 *
 * @param {Object} props - The component's props.
 * @param {Venue} props.venue - The venue data to be displayed in the card.
 *
 * @returns {JSX.Element} The rendered venue card, linking to the venue's details page.
 */

export const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  const location = useLocation();
  const isOnProfilePage = location.pathname === '/profile';
  const longWord = breakWords(venue.description);
  return (
    <Link
      to={`/venues?id=${venue.id}`}
      className="lg:hover:scale-105 transition duration-150 font-primary"
    >
      <article className="flex flex-col h-full w-full">
        <div className="w-full h-52 rounded-xl overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={venue.media && venue.media.length > 0 ? venue.media[0]?.url : loadingImage}
            alt={venue.media && venue.media.length > 0 ? venue.media[0]?.alt : 'image not found'}
          />
        </div>
        <div className="flex flex-col min-h-[160px] gap-5">
          <div className="title-rating-container flex justify-between items-center gap-8 mt-3">
            <h3 className="text-base font-bold line-clamp-1"> {venue.name} </h3>
            <div className="flex gap-2 items-center">
              <Star fill="#000000" stroke="#000000" className="h-4" />
              <p className="text-sm">{venue.rating}</p>
            </div>
          </div>
          <div className="flex flex-col justify-between h-full">
            <p className={`text-sm line-clamp-3 ${longWord ? 'break-all' : 'break-word'}`}>
              {venue.description}
            </p>
            {venue.owner?.name === storedName && isOnProfilePage && (
              <div className="flex gap-5 text-sm my-2">
                <p>Bookings:</p>
                <p>{venue._count?.bookings}</p>
              </div>
            )}
            <div className="mt-auto text-sm font-bold">{venue.price}$ / night</div>
          </div>
        </div>
      </article>
    </Link>
  );
};
