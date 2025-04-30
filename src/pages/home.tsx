import { useEffect, useState } from 'react';
import { ReadVenues } from '../API/venues/read';

import { VenueCard } from '../Components/VenueCard';
import { Venue } from '../Types/common';

export const HomePage = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  useEffect(() => {
    ReadVenues(setVenues);
  }, [setVenues]);

  return (
    <>
      <h1 className="headlineOne">Home Page</h1>
      <div className="flex flex-wrap max-h-[1000px]">
        {venues.map((venue) => {
          return <VenueCard venue={venue} key={venue.id} />;
        })}
      </div>
    </>
  );
};
