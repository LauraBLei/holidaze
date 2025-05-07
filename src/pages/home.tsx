import { useEffect, useState } from 'react';
import { ReadVenues } from '../API/venues/read';
import { VenueCard } from '../Components/VenueCard';
import { Venue } from '../Types/common';
import { Search } from '../Components/Search';
import LoadingHomePage from '../Components/loading/LoadingHomePage';

export const HomePage = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [allVenues, setAllVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ReadVenues((data) => {
      setVenues(data);
      setAllVenues(data);
      setLoading(false);
    });
  }, []);

  const handleSearch = (query: string) => {
    const filtered = allVenues.filter((venue) =>
      venue && venue.name ? venue.name.toLowerCase().includes(query.toLowerCase()) : '',
    );
    setVenues(filtered);
  };

  if (loading) {
    return <LoadingHomePage />;
  }

  return (
    <div className="mx-5 w-full flex flex-col items-center justify">
      <section className="max-w-[1240px] w-full">
        <Search id="search" onSearch={handleSearch} />

        <h1 className="headlineOne mb-5 md:mb-8">All Venues</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10">
          {venues.map((venue) => {
            return <VenueCard venue={venue} key={venue.id} />;
          })}
        </div>
        {venues.length === 0 && (
          <p className="text-center">No venues found matching your search.</p>
        )}
      </section>
    </div>
  );
};
