import LoadingVenueCard from './loadingVenueCard';
import { Search } from '../Search';

export default function LoadingHomePage() {
  return (
    <div className="mx-5 w-full flex flex-col items-center justify">
      <Search id="search" />
      <section className="max-w-[1240px] w-full">
        <h1 className="headlineOne mb-5 md:mb-8">All Venues</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10">
          <LoadingVenueCard />
          <LoadingVenueCard />
          <LoadingVenueCard />
          <LoadingVenueCard />
          <LoadingVenueCard />
          <LoadingVenueCard />
          <LoadingVenueCard />
          <LoadingVenueCard />
          <LoadingVenueCard />
          <LoadingVenueCard />
          <LoadingVenueCard />
        </div>
      </section>
    </div>
  );
}
