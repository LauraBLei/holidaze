import { useEffect, useState } from 'react';
import { ReadVenues } from '../API/venues/read';
import { VenueCard } from '../Components/VenueCard';
import { Venue } from '../Types/common';
import { Search } from '../Components/Search';
import LoadingHomePage from '../Components/loading/LoadingHomePage';
import { motion } from 'framer-motion';
import { fadeOutOnlyVariants } from '../Constants/constants';

/**
 * The HomePage component displays a list of all available venues. It fetches the venue data from an API on
 * component mount and allows users to filter the list using a search functionality. It also handles loading
 * states while data is being fetched.
 *
 * - Fetches venue data using `ReadVenues` and updates the state accordingly.
 * - Displays a search input to filter the venues by name.
 * - Renders a grid of `VenueCard` components for each venue.
 * - Shows a loading component while fetching the venue data.
 * - If no venues match the search query, a message is displayed.
 *
 * @returns {JSX.Element} The rendered homepage with a list of venues and a search bar.
 */

export const HomePage = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [allVenues, setAllVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'HAL - Holidaze';
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
    <motion.div
      variants={fadeOutOnlyVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center justify"
    >
      <div className="max-w-[1440px] w-full">
        <section className="mx-5">
          <Search id="search" onSearch={handleSearch} />

          <h1 className="headlineOne mb-5 md:mb-8">All Venues</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10">
            {venues.map((venue) => (
              <VenueCard venue={venue} key={venue.id} />
            ))}
          </div>
          {venues.length === 0 && (
            <p className="text-center">No venues found matching your search.</p>
          )}
        </section>
      </div>
    </motion.div>
  );
};
