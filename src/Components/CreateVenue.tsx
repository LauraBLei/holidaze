import { useState } from 'react';
import { FaDog, FaParking } from 'react-icons/fa';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { PiForkKnifeBold, PiPlusCircle } from 'react-icons/pi';
import { Media } from '../Types/common';
import { handleCreateVenueSubmit } from '../UI/venue/create';
import { GalleryComponent } from './gallery';
import { InputField } from './InputField';

const title = 'text-xl md:text-2xl lg:text-3xl pb-2 border-b border-brand-grey mb-2 md:mb-8';
const amenitiesLabel = 'grid grid-cols-2 md:flex md:gap-5 items-center w-full cursor-pointer';
const amenitiesCheckbox =
  'w-6 h-6 border-1 bg-white border-black rounded-md flex items-center justify-center peer-checked:bg-black';

export const CreateVenueForm = () => {
  const [media, setMedia] = useState<Media[]>([]);
  const [imageInput, setImageInput] = useState('');
  const [imageLimitReached, setImageLimitReached] = useState(false);

  const handleRemoveImage = (url: string) => {
    setMedia((prev) => prev.filter((image) => image.url !== url));
  };

  const handleAddImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!imageInput.trim()) return;

    if (media.length >= 8) {
      setImageLimitReached(true);
      setTimeout(() => {
        setImageLimitReached(false);
      }, 5000);
      return;
    }

    setMedia((prev) => [...prev, { url: imageInput.trim(), alt: 'venue image' }]);
    setImageInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget as HTMLFormElement);
    handleCreateVenueSubmit(formdata, media);
  };

  return (
    <div className="max-w-[1000px] w-full h-full flex flex-col justify-center font-primary">
      <form className="mx-5 flex flex-col mb-10 gap-12 md:gap-28" onSubmit={handleSubmit}>
        <div className="h-full flex flex-col gap-4 mt-10">
          {media.length > 0 && (
            <GalleryComponent media={media} onRemoveImage={handleRemoveImage} isEditable={true} />
          )}
        </div>

        {/* Basic info */}
        <div className="flex flex-col gap-4">
          <h2 className={title}>Basic info</h2>

          <InputField
            id="image"
            name="image"
            labelText="URL - Media"
            type="url"
            value={imageInput}
            placeholder="https://example.com/image.jpg"
            icon={<PiPlusCircle size={24} />}
            onChange={(e) => setImageInput(e.target.value)}
            onButtonClick={handleAddImage}
          />
          {imageLimitReached && (
            <div className="bg-error-red text-black p-3 rounded-xl mb-4">
              You can only add up to 8 images.
            </div>
          )}

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

            <InputField
              id="rating"
              name="rating"
              labelText="Rating"
              type="number"
              placeholder="Venue rating (1–5)"
              min={0}
              max={5}
              step={1}
              className="input text-center"
            />
          </div>
        </div>
        {/* Location */}
        <div className="flex flex-col gap-4">
          <h2 className={title}>Location</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              id="address"
              name="address"
              labelText="Address"
              type="text"
              placeholder="Imaginary street 123"
              className="input"
            />

            <InputField
              id="city"
              name="city"
              labelText="City"
              type="text"
              placeholder="Bergen"
              className="input"
            />

            <InputField
              id="zip-code"
              name="zip-code"
              labelText="Zip-Code"
              type="text"
              placeholder="1010"
              className="input"
            />

            <InputField
              id="country"
              name="country"
              labelText="Country"
              type="text"
              placeholder="Dreamland"
              className="input"
            />
          </div>
        </div>
        {/* Amenities */}
        <div className="flex flex-col gap-4">
          <h2 className={title}>Amenities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex w-full p-2 rounded">
              <label htmlFor="pets" className={amenitiesLabel}>
                <div className="flex items-center gap-2">
                  <FaDog size={24} />
                  <span className="text-base">Pets</span>
                </div>

                <div className="relative">
                  <input type="checkbox" id="pets" name="pets" className="sr-only peer" />
                  <span className={amenitiesCheckbox}>
                    <IoCheckmarkSharp size={18} className="text-white hidden peer-checked:block" />
                  </span>
                </div>
              </label>
            </div>

            <div className="flex w-full p-2 rounded">
              <label htmlFor="parking" className={amenitiesLabel}>
                <div className="flex items-center gap-2">
                  <FaParking size={24} />
                  <span className="text-base">Parking</span>
                </div>

                <div className="relative">
                  <input type="checkbox" id="parking" name="parking" className="sr-only peer" />
                  <span className={amenitiesCheckbox}>
                    <IoCheckmarkSharp size={18} className="text-white hidden peer-checked:block" />
                  </span>
                </div>
              </label>
            </div>

            <div className="flex w-full p-2 rounded">
              <label htmlFor="breakfast" className={amenitiesLabel}>
                <div className="flex items-center gap-2">
                  <PiForkKnifeBold size={24} />
                  <span className="text-base">Breakfast</span>
                </div>

                <div className="relative">
                  <input type="checkbox" id="breakfast" name="breakfast" className="sr-only peer" />
                  <span className={amenitiesCheckbox}>
                    <IoCheckmarkSharp size={18} className="text-white hidden peer-checked:block" />
                  </span>
                </div>
              </label>
            </div>

            <div className="flex w-full p-2 rounded">
              <label htmlFor="wifi" className={amenitiesLabel}>
                <div className="flex items-center gap-2">
                  <FaParking size={24} />
                  <span className="text-base">Free Wifi</span>
                </div>

                <div className="relative">
                  <input type="checkbox" id="wifi" name="wifi" className="sr-only peer" />
                  <span className={amenitiesCheckbox}>
                    <IoCheckmarkSharp size={18} className="text-white hidden peer-checked:block" />
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="button transition font-bold">
            Create venue
          </button>
        </div>
      </form>
    </div>
  );
};
