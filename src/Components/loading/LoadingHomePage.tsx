import LoadingVenueCard from './loadingVenueCard';

export default function LoadingHomePage() {
  return (
    <div className="mx-5 w-full flex flex-col items-center justify">
      <div role="search" className="pt-10 mb-16 w-full flex justify-center items-center">
        <div className="max-w-[650px] w-full relative animate-pulse">
          <div className="w-full h-12 bg-gray-200 rounded"></div>
          <div className="w-12 h-12 bg-gray-300 rounded absolute top-0 right-0"></div>
        </div>
      </div>
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
          <LoadingVenueCard />
        </div>
      </section>
    </div>
  );
}
