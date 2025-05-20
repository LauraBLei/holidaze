import { useEffect, useState } from 'react';
import { ReadVenues } from '../API/venues/read';
import { VenueCard } from '../Components/VenueCard';
import { Venue } from '../Types/common';
import { Search } from '../Components/Search';
import LoadingHomePage from '../Components/loading/SkeletonLoaderHome';
import { motion } from 'framer-motion';
import { fadeOutOnlyVariants } from '../Constants/constants';
import { searchVenues } from '../API/venues/search';
import { Pagination } from '../Components/pagination';

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
  const [allVenues, setAllVenues] = useState<Venue[]>([]);
  const [searchAllVenues, setSearchAllVenues] = useState<Venue[]>([]);
  const [searchPage, setSearchPage] = useState<number>(1);
  const [searchTotalCount, setSearchTotalCount] = useState(0);
  const [venuePage, setVenuePage] = useState<number>(1);
  const [venueTotalCount, setVenueTotalCount] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');
  const limit = 12;
  const searchTotalPages = Math.ceil(searchTotalCount / limit);
  const venueTotalPages = Math.ceil(venueTotalCount / limit);
  const searchHasNext = searchPage < searchTotalPages;
  const searchHasPrevious = searchPage > 1;
  const venueHasNext = venuePage < venueTotalPages;
  const venueHasPrevious = venuePage > 1;

  useEffect(() => {
    document.title = 'HAL - Holidaze';
  }, []);

  useEffect(() => {
    ReadVenues({
      page: venuePage,
      limit: limit,
      setVenues: setAllVenues,
      setTotalCount: setVenueTotalCount,
    });
  }, [venuePage]);

  useEffect(() => {
    searchVenues({
      page: searchPage,
      limit: limit,
      setVenues: setSearchAllVenues,
      setTotalCount: setSearchTotalCount,
      text: searchText,
    });
  }, [searchPage, searchText]);

  if (allVenues.length === 0) {
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
      <div className="max-w-[1440px] w-full ">
        <Search setSearchText={setSearchText} />
        {searchText &&
          SearchSection({
            searchAllVenues: searchAllVenues,
            searchHasNext: searchHasNext,
            searchHasPrevious: searchHasPrevious,
            searchPage: searchPage,
            searchText: searchText,
            searchTotalPages: searchTotalPages,
            setSearchPage: setSearchPage,
            setText: setSearchText,
          })}
        <section className="mx-5">
          <h2 className="font-bold text-lg md:text-2xl self-start border-b-[1px] border-brand-grey mb-5 py-2">
            All Venues
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10">
            {allVenues.map((venue) => (
              <VenueCard venue={venue} key={venue.id} />
            ))}
          </div>
          <Pagination
            page={venuePage}
            setPage={setVenuePage}
            hasNext={venueHasNext}
            hasPrevious={venueHasPrevious}
            totalPages={venueTotalPages}
          />
        </section>
      </div>
    </motion.div>
  );
};

interface searchSectionProps {
  searchAllVenues: Venue[];
  searchText: string;
  searchPage: number;
  setSearchPage: (input: number) => void;
  searchHasNext: boolean;
  searchHasPrevious: boolean;
  searchTotalPages: number;
  setText: (input: string) => void;
}
const SearchSection = ({
  searchAllVenues,
  searchText,
  searchPage,
  setSearchPage,
  searchHasNext,
  searchHasPrevious,
  searchTotalPages,
  setText,
}: searchSectionProps) => (
  <>
    {searchAllVenues.length > 0 ? (
      <section className="mx-5 mb-15">
        <div className="flex justify-between items-center font-bold text-lg md:text-2xl self-start border-b-[1px] border-brand-grey mb-5 py-2">
          <h2>Search: '{searchText}'</h2>
          <button
            onClick={() => setText('')}
            className="text-xl font-semi-bold transition scale-95 hover:scale-100 cursor-pointer"
          >
            clear search
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10">
          {searchAllVenues.map((venue) => (
            <VenueCard venue={venue} key={venue.id} />
          ))}
        </div>
        <Pagination
          page={searchPage}
          setPage={setSearchPage}
          hasNext={searchHasNext}
          hasPrevious={searchHasPrevious}
          totalPages={searchTotalPages}
        />
      </section>
    ) : (
      <section className="mx-5 mb-15">
        <h2 className="font-bold text-lg md:text-2xl self-start border-b-[1px] border-brand-grey mb-5 py-2">
          Search: '{searchText}'
        </h2>
        <p>No venues found!</p>
      </section>
    )}
  </>
);
