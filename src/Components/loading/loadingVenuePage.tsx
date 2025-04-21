export default function LoadingVenuePage() {
  return (
    <section
      className="flex flex-col animate-pulse w-full md:max-w-[1250px] md:flex-row"
      aria-hidden="true"
    >
      <div className="imageAndPriceWrapper flex flex-col gap-16">
        <div className="imageContainer flex flex-col gap-5">
          <div className="mainImage w-full h-[440px] bg-[#C4C4C4] rounded-xl md:max-w-[530px]"></div>
          <div className="smallImageWrapper flex justify-between">
            <div className="image1 w-[22%] md:w-[95px] h-[85px] bg-[#C4C4C4] rounded-xl"></div>
            <div className="image2 w-[22%] md:w-[95px] h-[85px] bg-[#C4C4C4] rounded-xl"></div>
            <div className="image3 w-[22%] md:w-[95px] h-[85px] bg-[#C4C4C4] rounded-xl"></div>
            <div className="image4 w-[22%] md:w-[95px] h-[85px] bg-[#C4C4C4] rounded-xl"></div>
          </div>
        </div>
        <div className="priceContainer flex flex-col gap-5 mb-16 md:mb-0">
          <div className="price w-[125px] h-[30px] bg-[#C4C4C4] rounded-xl"></div>
          <div className="nights w-[70px] h-[20px] bg-[#C4C4C4] rounded-xl"></div>
          <div className="checkIn-Out-Inputs flex w-full md:w-[530px] justify-between">
            <div className="checkIn w-[45%] h-[45px] bg-[#C4C4C4] rounded-xl"></div>
            <div className="checkOut w-[45%] h-[45px] bg-[#C4C4C4] rounded-xl"></div>
          </div>
          <div className="guests w-[100%] h-[45px] bg-[#C4C4C4] rounded-xl"></div>
          <div className="reserve w-[50%] h-[45px] bg-[#C4C4C4] rounded-xl self-center mt-10"></div>
        </div>
      </div>
      <div className="infoWrapper flex flex-col w-full md:w-[720px] md:ml-20 gap-5">
        <div className="title-edit-delete flex justify-between">
          <div className="title w-[40%] h-[30px] bg-[#C4C4C4] rounded-xl"></div>
          <div className="edit-delete-wrapper w-[50%] flex gap-5">
            <div className="edit w-[40%] h-[30px] bg-[#C4C4C4] rounded-xl"></div>
            <div className="delete w-[40%] h-[30px] bg-[#C4C4C4] rounded-xl"></div>
          </div>
        </div>
        <div className="guests-max w-[20%] h-[30px] bg-[#C4C4C4] rounded-xl"></div>
        <div className="rating w-[40%] h-[30px] bg-[#C4C4C4] rounded-xl"></div>
        <div className="host w-[40%] h-[30px] bg-[#C4C4C4] rounded-xl"></div>
        <div className="location w-[40%] h-[30px] bg-[#C4C4C4] rounded-xl"></div>
        <div className="desc w-[100%] h-[300px] bg-[#C4C4C4] rounded-xl"></div>
        <div className="ammenities-header w-[40%] h-[30px] bg-[#C4C4C4] rounded-xl mt-10"></div>
        <div className="ammenities-container flex flex-col gap-10">
          <div className="row-1 flex justify-between">
            <div className="pets w-[40%] h-[30px] bg-[#C4C4C4] rounded-xl"></div>
            <div className="wifi w-[40%] h-[30px] bg-[#C4C4C4] rounded-xl"></div>
          </div>
          <div className="row-2 flex justify-between">
            <div className="parking w-[40%] h-[30px] bg-[#C4C4C4] rounded-xl"></div>
            <div className="breakfast w-[40%] h-[30px] bg-[#C4C4C4] rounded-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
