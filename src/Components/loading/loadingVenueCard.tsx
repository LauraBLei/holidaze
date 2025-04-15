export default function LoadingVenueCard () {
  return (
    <article className="flex flex-col max-w-[245px] gap-[20px] animate-pulse">
      <div className="imagePlaceHolder  h-[200px] bg-[#C4C4C4] rounded-xl"></div>
      <div className="title&RatingWrapper flex justify-between">
        <div className="titlePlaceHolder bg-[#C4C4C4] h-[27px] w-[60%]"></div>
        <div className="ratingPlaceHolder bg-[#C4C4C4] h-[27px] w-[35%]"></div>
      </div>
      <div className="descPlaceHolder  bg-[#C4C4C4] w-full h-[50px]"></div>
      <div className="pricePlaceHolder  bg-[#C4C4C4] w-[35%] h-[27px]"></div>
    </article>
  )
}