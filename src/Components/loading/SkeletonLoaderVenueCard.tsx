/**
 * SkeletonLoaderCard component displays a skeleton loader for a venue card.
 * This is used while the venue details are loading. It includes placeholders
 * for the venue image, name, description, and other details.
 *
 * @component
 * @example
 * return <SkeletonLoaderCard />;
 *
 * @returns {JSX.Element} The SkeletonLoaderCard component with skeleton loaders
 */

export default function SkeletonLoaderCard() {
  return (
    <article className="flex flex-col  md:max-w-[280px] w-full gap-[20px] animate-pulse">
      <div className="h-[200px] bg-[#C4C4C4] rounded-xl"></div>
      <div className="flex justify-between">
        <div className="bg-[#C4C4C4] h-[27px] w-[60%] rounded"></div>
        <div className="bg-[#C4C4C4] h-[27px] w-[35%] rounded"></div>
      </div>
      <div className="bg-[#C4C4C4] w-full h-[50px] rounded"></div>
      <div className="bg-[#C4C4C4] w-[35%] h-[27px] rounded"></div>
    </article>
  );
}
