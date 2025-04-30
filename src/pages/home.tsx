import { useEffect, useState } from 'react';
import { ReadVenues } from '../API/venues/read';
import { VenueCard } from '../Components/VenueCard';
import { Venue } from '../Types/common';
import { Search } from '../Components/Search';

export const HomePage = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [allVenues, setAllVenues] = useState<Venue[]>([]);

  useEffect(() => {
    ReadVenues((data) => {
      setVenues(data);
      setAllVenues(data);
    });
  }, []);

  const handleSearch = (query: string) => {
    const filtered = allVenues.filter((venue) =>
      venue.name.toLowerCase().includes(query.toLowerCase()),
    );
    setVenues(filtered);
  };

  return (
    <section className="mx-5 max-w-[1240px] w-full">
      <Search id="search" onSearch={handleSearch} />
      {venues.length === 0 && (
        <p className="text-center text-gray-500">No venues found matching your search.</p>
      )}
      <h1 className="headlineOne">All Venues</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10">
        {venues.map((venue) => {
          return <VenueCard venue={venue} key={venue.id} />;
        })}
      </div>
    </section>
  );
};
