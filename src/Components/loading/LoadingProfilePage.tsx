import LoadingVenueCard from './loadingVenueCard';

/**
 * LoadingProfilePage component displays a skeleton loader for the profile page
 * while the profile data and venues are loading. It includes loading placeholders
 * for the profile banner, avatar, bio, and venue cards.
 *
 * @component
 * @example
 * return <LoadingProfilePage />;
 *
 * @returns {JSX.Element} The LoadingProfilePage component with skeleton loaders
 */

export default function LoadingProfilePage() {
  return (
    <div className="skeletonLoaders animate-pulse w-full flex flex-col items-center gap-14 md:gap-20 lg:gap-24">
      <div className="max-w-[1440px] w-full flex flex-col  items-center md:items-start">
        <div className="skeleton-banner bg-[#C4C4C4] w-full h-[250px] md:h-[360px]"></div>
        <div className="flex flex-col md:flex-row items-center w-full gap-5 md:gap-0">
          <div className="skeleton-avatar flex items-center justify-center overflow-hidden rounded-full w-full h-[136px] max-w-[136px] md:h-[170px] md:max-w-[170px] lg:h-[236px] lg:max-w-[236px] mt-[-68px] md:mt-[-85px] lg:mt-[-125px] md:ml-[50px] lg:ml-[75px]">
            <div className="bg-[#9a9a9a] rounded-full w-full h-full"></div>
          </div>
          <div className="skeleton-bio flex flex-col justify-center w-full">
            <div className="flex flex-col gap-4 justify-center mx-5">
              <div className="bg-[#C4C4C4] h-5 w-16 rounded"></div>
              <div className="bg-[#C4C4C4] h-5 w-40 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="max-w-[850px] w-full h-full grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-5 md:gap-8 lg:gap-10 mx-5">
          <LoadingVenueCard />
          <LoadingVenueCard />
          <LoadingVenueCard />
          <LoadingVenueCard />
          <LoadingVenueCard />
          <LoadingVenueCard />
        </div>
      </div>
    </div>
  );
}
