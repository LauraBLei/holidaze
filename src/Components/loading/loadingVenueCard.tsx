export default function LoadingVenueCard () {
  return (
    <article className="flex flex-col max-w-[245px] gap-[20px] animate-pulse" aria-hidden="true">
      <div className="h-[200px] bg-[#C4C4C4] rounded-xl"></div>
      <div className="flex justify-between">
        <div className="bg-[#C4C4C4] h-[27px] w-[60%] rounded"></div>
        <div className="bg-[#C4C4C4] h-[27px] w-[35%] rounded"></div>
      </div>
      <div className="bg-[#C4C4C4] w-full h-[50px] rounded"></div>
      <div className="bg-[#C4C4C4] w-[35%] h-[27px] rounded"></div>
    </article>
  )
}