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
    <section className="mx-5">
      <h1 className="headlineOne">All Venues</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
        {venues.map((venue) => {
          return <VenueCard venue={venue} key={venue.id} />;
        })}
      </div>
    </section>
  );
};
