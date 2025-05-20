/**
 * SkeletonLoaderVenue component displays a skeleton loader for a venue page.
 * This is used while the venue page content (such as gallery, price, booking form,
 * location, and amenities) is loading. It includes placeholders for different sections
 * of the venue page layout.
 *
 * @component
 * @example
 * return <SkeletonLoaderVenue />;
 *
 * @returns {JSX.Element} The SkeletonLoaderVenue component with skeleton loaders for each section
 */

export default function SkeletonLoaderVenue() {
  return (
    <div className="font-primary w-full h-full px-5 flex flex-wrap lg:flex-nowrap justify-center  lg:justify-between gap-5 max-w-[1440px] animate-pulse">
      {/* Left column */}
      <div className="max-w-[700px] w-full mb-5 md:mb-10 flex flex-col gap-10">
        {/* Gallery placeholder */}
        <div className="flex flex-col gap-5">
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-[#C4C4C4] rounded-xl" />
          <div className="flex w-full gap-5 md:gap-x-12 gap-y-3 flex-wrap">
            <div className="w-full max-w-[95px] h-[85px] bg-[#C4C4C4] rounded-xl"></div>
            <div className="w-full max-w-[95px] h-[85px] bg-[#C4C4C4] rounded-xl"></div>
            <div className="w-full max-w-[95px] h-[85px] bg-[#C4C4C4] rounded-xl"></div>
          </div>
        </div>

        {/* Price and Booking Form placeholders */}
        <div className="flex flex-col gap-5">
          <div className="w-[125px] h-[30px] bg-[#C4C4C4] rounded-xl"></div>
          <div className="w-[70px] h-[20px] bg-[#C4C4C4] rounded-xl"></div>
          <div className="flex flex-col sm:flex-row md:justify-between gap-5 w-full">
            <div className="w-full h-[64px] bg-[#C4C4C4] rounded-xl"></div>
            <div className="w-full h-[64px] bg-[#C4C4C4] rounded-xl"></div>
          </div>
          <div className="w-full h-[64px] bg-[#C4C4C4] rounded-xl"></div>
          <div className="w-full md:w-[300px] h-[45px] bg-[#C4C4C4] rounded-xl self-center mt-10"></div>
        </div>
      </div>

      {/* Right column */}
      <div className="flex flex-col gap-5 w-full md:max-w-[700px] md:min-w-[350px] px-2">
        {/* Title */}
        <div className="flex justify-between items-center flex-wrap gap-10">
          <div className="w-[40%] h-[30px] bg-[#C4C4C4] rounded-xl"></div>
        </div>

        {/* Guests, Rating, Host */}
        <div className="w-[20%] h-[30px] bg-[#C4C4C4] rounded-xl"></div>
        <div className="w-[40%] h-[30px] bg-[#C4C4C4] rounded-xl"></div>
        <div className="flex items-center gap-2 border-y-2 border-brand-grey py-2">
          <div className="w-[41px] h-[41px] bg-[#C4C4C4] rounded-full"></div>
          <div className="w-[30%] h-[20px] bg-[#C4C4C4] rounded-xl"></div>
        </div>

        {/* Location */}
        <div className="flex gap-2 items-center border-b-2 border-brand-grey py-3">
          <div className="w-[25px] h-[25px] bg-[#C4C4C4] rounded-full"></div>
          <div className="w-[70%] h-[20px] bg-[#C4C4C4] rounded-xl"></div>
        </div>

        {/* Description */}
        <div className="w-full h-[100px] bg-[#C4C4C4] rounded-xl border-b-2 border-brand-grey py-5"></div>

        {/* Amenities */}
        <div>
          <div className="w-[40%] h-[30px] bg-[#C4C4C4] rounded-xl mb-5"></div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex gap-2 items-center">
              <div className="w-[25px] h-[25px] bg-[#C4C4C4] rounded-full"></div>
              <div className="w-[40%] h-[20px] bg-[#C4C4C4] rounded-xl"></div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-[25px] h-[25px] bg-[#C4C4C4] rounded-full"></div>
              <div className="w-[40%] h-[20px] bg-[#C4C4C4] rounded-xl"></div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-[25px] h-[25px] bg-[#C4C4C4] rounded-full"></div>
              <div className="w-[40%] h-[20px] bg-[#C4C4C4] rounded-xl"></div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-[25px] h-[25px] bg-[#C4C4C4] rounded-full"></div>
              <div className="w-[40%] h-[20px] bg-[#C4C4C4] rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
