import { FaDog, FaParking } from 'react-icons/fa';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { PiForkKnifeBold, PiPlusCircle } from 'react-icons/pi';

const title = 'text-3xl pb-2 border-b border-brand-grey mb-8';

export const CreateVenueForm = () => {
  return (
    <div className="max-w-[1000px] w-full h-full flex flex-col justify-center">
      <form className="mx-5 flex flex-col gap-28">
        {/* Basic info */}
        <div className="flex flex-col gap-4">
          <h2 className={title}>Basic info</h2>
          <div className="w-full">
            <label htmlFor="image" className="text-base">
              URL - Media
            </label>
            <div className="relative mt-1">
              <input
                id="image"
                type="url"
                className="input"
                placeholder="https://example.com/image.jpg"
              />
              <div className="w-12 p-3 flex items-center justify-center absolute top-0 right-0 bg-brand-orange border border-l-0 rounded-r border-brand-grey">
                <PiPlusCircle size={24} />
              </div>
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="name" className="text-base">
              Name of venue
            </label>
            <div className="relative pt-1">
              <input id="name" type="text" className="input" placeholder="Name of the venue" />
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="description" className="text-base">
              Description
            </label>
            <div className="relative pt-1">
              <textarea
                id="description"
                className=" w-full h-36 border border-brand-grey p-3 rounded-xl "
                placeholder="Write a description of the venue"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Pricing & Guests */}
        <div className="flex flex-col gap-4">
          <h2 className={title}>Pricing & Guests</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="w-full">
              <label htmlFor="price" className="text-base">
                Price
              </label>
              <div className="relative pt-1">
                <input
                  id="price"
                  type="number"
                  className="input text-center"
                  placeholder="Enter price"
                />
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="max-guests" className="text-base">
                Max Guests
              </label>
              <div className="relative pt-1">
                <input
                  id="max-guests"
                  type="number"
                  className="input text-center"
                  placeholder="Add number of guests"
                  min={1}
                  max={10}
                  step={1}
                />
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="rating" className="text-base">
                Rating
              </label>
              <div className="relative pt-1">
                <input
                  id="rating"
                  type="number"
                  className="input text-center"
                  placeholder="Venue rating (1–5)"
                  min={0}
                  max={5}
                  step={1}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col gap-4">
          <h2 className={title}>Location</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="w-full">
              <label htmlFor="address" className="text-base">
                Address
              </label>
              <div className="relative pt-1">
                <input
                  id="address"
                  type="text"
                  className="input"
                  placeholder="Imaginary street 123"
                />
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="city" className="text-base">
                City
              </label>
              <div className="relative pt-1">
                <input id="city" type="text" className="input" placeholder="Bergen" />
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="zip-code" className="text-base">
                Zip-Code
              </label>
              <div className="relative pt-1">
                <input id="zip-code" type="text" className="input" placeholder="1010" />
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="country" className="text-base">
                Country
              </label>
              <div className="relative pt-1">
                <input id="country" type="text" className="input" placeholder="Dreamland" />
              </div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-col gap-4">
          <h2 className={title}>Amenities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex w-full p-2 rounded bg-red-300">
              <label
                htmlFor="pets"
                className="flex justify-between items-center w-full cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FaDog size={24} />
                  <span className="text-base">Pets</span>
                </div>

                <div className="relative">
                  <input type="checkbox" id="pets" className="sr-only peer" />
                  <span className="w-6 h-6 border-1 bg-white border-black rounded-md flex items-center justify-center peer-checked:bg-black">
                    <IoCheckmarkSharp size={18} className="text-white hidden peer-checked:block" />
                  </span>
                </div>
              </label>
            </div>

            <div className="flex w-full p-2 rounded bg-blue-300">
              <label
                htmlFor="parking"
                className="flex justify-between items-center w-full cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FaParking size={24} />
                  <span className="text-base">Parking</span>
                </div>

                <div className="relative">
                  <input type="checkbox" id="parking" className="sr-only peer" />
                  <span className="w-6 h-6 border-1 bg-white border-black rounded-md flex items-center justify-center peer-checked:bg-black">
                    <IoCheckmarkSharp size={18} className="text-white hidden peer-checked:block" />
                  </span>
                </div>
              </label>
            </div>

            <div className="flex w-full p-2 rounded bg-purple-300">
              <label
                htmlFor="breakfast"
                className="flex justify-between items-center w-full cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <PiForkKnifeBold size={24} />
                  <span className="text-base">Breakfast</span>
                </div>

                <div className="relative">
                  <input type="checkbox" id="breakfast" className="sr-only peer" />
                  <span className="w-6 h-6 border-1 bg-white border-black rounded-md flex items-center justify-center peer-checked:bg-black">
                    <IoCheckmarkSharp size={18} className="text-white hidden peer-checked:block" />
                  </span>
                </div>
              </label>
            </div>

            <div className="flex w-full p-2 rounded bg-orange-300">
              <label
                htmlFor="wifi"
                className="flex justify-between items-center w-full cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FaParking size={24} />
                  <span className="text-base">Free Wifi</span>
                </div>

                <div className="relative">
                  <input type="checkbox" id="wifi" className="sr-only peer" />
                  <span className="w-6 h-6 border-1 bg-white border-black rounded-md flex items-center justify-center peer-checked:bg-black">
                    <IoCheckmarkSharp size={18} className="text-white hidden peer-checked:block" />
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
