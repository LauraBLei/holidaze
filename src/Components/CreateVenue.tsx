import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
// import { FaDog, FaParking } from 'react-icons/fa';
// import { IoCheckmarkSharp } from 'react-icons/io5';
// import { PiForkKnifeBold, PiPlusCircle } from 'react-icons/pi';
import { InputType } from '../Types/common';
import { handleCreateVenueSubmit } from '../UI/venue/create';

const title = 'text-3xl pb-2 border-b border-brand-grey mb-8';

const InputField = ({ id, labelText, icon, onButtonClick, textarea, ...rest }: InputType) => (
  <div className="w-full">
    {labelText && id && (
      <label htmlFor={id} className="text-base">
        {labelText}
      </label>
    )}
    <div className="relative mt-1">
      {textarea ? (
        <textarea
          id={id}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className="w-full h-36 border border-brand-grey p-3 rounded-xl focus:border-0 focus:outline-brand-grey"
        />
      ) : (
        <input
          id={id}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          className="input focus:border-0 focus:outline-1 focus:outline-brand-grey"
        />
      )}

      {icon && (
        <button
          type="button"
          onClick={onButtonClick}
          className="w-12 p-3 flex items-center justify-center absolute top-0 right-0 bg-brand-orange border border-l-0 rounded-r-xl border-brand-grey cursor-pointer"
        >
          {icon}
        </button>
      )}
    </div>
  </div>
);

export const CreateVenueForm = () => {
  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   handleCreateVenueSubmit(formData);
  // };

  return (
    <div className="max-w-[1000px] w-full h-full flex flex-col justify-center">
      <form
        className="mx-5 flex flex-col gap-28"
        onSubmit={(e) => {
          e.preventDefault();
          const formdata = new FormData(e.currentTarget);
          handleCreateVenueSubmit(formdata);
        }}
      >
        {/* Basic info */}
        <div className="flex flex-col gap-4">
          <h2 className={title}>Basic info</h2>

          {/* <InputField
            id="image"
            labelText="URL - Media"
            type="url"
            placeholder="https://example.com/image.jpg"
            icon={<PiPlusCircle size={24} />}
          /> */}

          <InputField
            id="name"
            name="name"
            type="text"
            labelText="Name of venue"
            placeholder="Name of the venue"
          />

          <InputField
            id="description"
            name="description"
            type="text"
            labelText="Description"
            placeholder="Write a description of the venue"
            textarea
          />
        </div>

        {/* Pricing & Guests */}
        <div className="flex flex-col gap-4">
          <h2 className={title}>Pricing & Guests</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InputField
              id="price"
              name="price"
              labelText="Price"
              type="number"
              placeholder="Enter price"
              className="input text-center"
            />

            <InputField
              id="maxGuests"
              name="maxGuests"
              labelText="Max Guests"
              type="number"
              placeholder="Add number of guests"
              min={1}
              max={10}
              step={1}
              className="input text-center"
            />

            {/* <InputField
              id="rating"
              labelText="Rating"
              type="number"
              placeholder="Venue rating (1–5)"
              min={0}
              max={5}
              step={1}
              className="input text-center"
            /> */}
          </div>
        </div>

        {/* Location */}
        {/* <div className="flex flex-col gap-4">
          <h2 className={title}>Location</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              id="address"
              labelText="Address"
              type="text"
              placeholder="Imaginary street 123"
              className="input"
            />

            <InputField
              id="city"
              labelText="City"
              type="text"
              placeholder="Bergen"
              className="input"
            />

            <InputField
              id="zip-code"
              labelText="Zip-Code"
              type="text"
              placeholder="1010"
              className="input"
            />

            <InputField
              id="country"
              labelText="Country"
              type="text"
              placeholder="Dreamland"
              className="input"
            />
          </div>
        </div> */}

        {/* Amenities */}
        {/* <div className="flex flex-col gap-4">
          <h2 className={title}>Amenities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex w-full p-2 rounded">
              <label
                htmlFor="pets"
                className="grid grid-cols-2 md:flex md:gap-5 items-center w-full cursor-pointer"
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

            <div className="flex w-full p-2 rounded">
              <label
                htmlFor="parking"
                className="grid grid-cols-2 md:flex md:gap-5 items-center w-full cursor-pointer"
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

            <div className="flex w-full p-2 rounded">
              <label
                htmlFor="breakfast"
                className="grid grid-cols-2 md:flex md:gap-5 items-center w-full cursor-pointer"
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

            <div className="flex w-full p-2 rounded">
              <label
                htmlFor="wifi"
                className="grid grid-cols-2 md:flex md:gap-5 items-center w-full cursor-pointer"
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
        </div> */}
        <div className="flex justify-center">
          <button type="submit" className="button transition font-bold">
            Create venue
          </button>
        </div>
      </form>
    </div>
  );
};
