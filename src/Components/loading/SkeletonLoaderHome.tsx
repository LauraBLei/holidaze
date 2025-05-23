import SkeletonLoaderVenueCard from './SkeletonLoaderVenueCard';

/**
 * SkeletonLoaderHome component displays a skeleton loader for the homepage
 * while the venues are loading. It includes loading placeholders for
 * venue cards and the header.
 *
 * @component
 * @example
 * return <SkeletonLoaderHome />;
 *
 * @returns {JSX.Element} The SkeletonLoaderHome component with skeleton loaders for venue cards
 */

export default function SkeletonLoaderHome() {
  return (
    <div className="w-full flex flex-col items-center justify">
      <div className="max-w-[1440px] w-full font primary">
        <div className="mx-5 2xl:mx-0">
          <div className="max-w-[1440px] w-full h-[600px] overflow-hidden mb-10">
            <div className="bg-brand-grey w-full h-full object-cover"></div>
          </div>
          <div role="search" className="pt-10 mb-16 w-full flex justify-center items-center">
            <div className="max-w-[650px] w-full relative animate-pulse">
              <div className="w-full h-12 bg-gray-200 rounded-xl"></div>
              <div className="w-12 h-12 bg-gray-300 rounded-xl absolute top-0 right-0"></div>
            </div>
          </div>
          <section className="max-w-[1440px] ">
            <h1 className="headlineOne text-lg md:text-2xl self-start border-b-[1px] border-brand-grey mb-5 py-2">
              All Venues
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10">
              <SkeletonLoaderVenueCard />
              <SkeletonLoaderVenueCard />
              <SkeletonLoaderVenueCard />
              <SkeletonLoaderVenueCard />
              <SkeletonLoaderVenueCard />
              <SkeletonLoaderVenueCard />
              <SkeletonLoaderVenueCard />
              <SkeletonLoaderVenueCard />
              <SkeletonLoaderVenueCard />
              <SkeletonLoaderVenueCard />
              <SkeletonLoaderVenueCard />
              <SkeletonLoaderVenueCard />
            </div>
            <div className="flex justify-center items-center gap-4 mt-10 animate-pulse">
              <div className="h-10 max-w-[100px] text-sm md:text-base w-full bg-brand-grey rounded disabled:opacity-50 cursor-pointer scale-95 hover:scale-100 transition"></div>

              <span className="bg-brand-grey w-16 h-5 rounded"></span>

              <div className="h-10 max-w-[100px] text-sm md:text-base w-full bg-brand-grey rounded disabled:opacity-50 cursor-pointer scale-95 hover:scale-100 transition"></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
