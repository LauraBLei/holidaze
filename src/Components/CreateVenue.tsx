import { PiPlusCircle } from 'react-icons/pi';

const title = 'text-3xl pb-2 border-b border-brand-grey mb-8';

export const CreateVenueForm = () => {
  return (
    <div className="max-w-[1000px] w-full h-full flex flex-col justify-center">
      <form className="mx-5 flex flex-col gap-28">
        <div className="flex flex-col gap-4">
          <h2 className={title}>Basic info</h2>
          <div className="w-full">
            <label htmlFor="image" className="text-base">
              URL - Media
            </label>
            <div className="relative">
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
            <div className="relative">
              <input id="name" type="text" className="input" placeholder="Name of the venue" />
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="description" className="text-base">
              Description
            </label>
            <div className="relative">
              <textarea
                id="description"
                className=" w-full h-36 border border-brand-grey p-3 rounded-xl "
                placeholder="Write a description of the venue"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className={title}>Pricing & Guests</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="w-full">
              <label htmlFor="price" className="text-base">
                Price
              </label>
              <div className="relative">
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
              <div className="relative">
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
              <div className="relative">
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

        <div className="flex flex-col gap-4">
          <h2 className={title}>Location</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="w-full">
              <label htmlFor="address" className="text-base">
                Address
              </label>
              <div className="relative">
                <input id="address" type="text" className="input" placeholder="Placeholder text" />
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="city" className="text-base">
                City
              </label>
              <div className="relative">
                <input id="city" type="text" className="input" placeholder="Placeholder text" />
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="zip-code" className="text-base">
                Zip-Code
              </label>
              <div className="relative">
                <input id="zip-code" type="text" className="input" placeholder="Placeholder text" />
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="country" className="text-base">
                Country
              </label>
              <div className="relative">
                <input id="country" type="text" className="input" placeholder="Placeholder text" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
