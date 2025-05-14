import { useState } from 'react';
import { FaDog, FaParking } from 'react-icons/fa';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { PiPlusCircle } from 'react-icons/pi';
import { Media, Meta } from '../Types/common';
import { handleCreateVenueSubmit } from '../UI/venue/create';
import { GalleryComponent } from './gallery';
import { InputField } from './InputField';
import { FaWifi } from 'react-icons/fa6';
import { GiKnifeFork } from 'react-icons/gi';
import {
  defaultStatus,
  setSubmitError,
  setSuccessMessage,
  setValidationError,
  StatusMessage,
} from '../utilities/validation/validation';
import { useNavigate } from 'react-router-dom';
import { validateForm } from '../utilities/validation/validateForm';

export const CreateVenueForm = () => {
  const navigate = useNavigate();
  const [media, setMedia] = useState<Media[]>([]);
  const [imageInput, setImageInput] = useState('');
  const [formStatus, setFormStatus] = useState<StatusMessage>(defaultStatus);
  const [amenitiesChecked, setAmenitiesChecked] = useState<Meta>({
    pets: false,
    parking: false,
    breakfast: false,
    wifi: false,
  });

  const handleAmenities = (key: keyof Meta) => {
    setAmenitiesChecked((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleRemoveImage = (url: string) => {
    setMedia((prev) => prev.filter((image) => image.url !== url));
  };

  const handleAddImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const trimmedUrl = imageInput.trim();

    if (!trimmedUrl) return;

    if (trimmedUrl.length > 300) {
      setValidationError('image', 'Image URL cannot be longer than 300 characters.', setFormStatus);
      return;
    }

    if (media.length >= 8) {
      setValidationError('image', 'You can only add up to 8 images.', setFormStatus);
      return;
    }

    setMedia((prev) => [...prev, { url: trimmedUrl, alt: 'venue image' }]);
    setImageInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget as HTMLFormElement);

    const isValid = validateForm(formdata, setFormStatus);
    if (!isValid) return;

    try {
      await handleCreateVenueSubmit(formdata, media);
      setSuccessMessage('Venue created successfully!', setFormStatus);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Venue creation failed:', error);
      const err = error as Error;
      setSubmitError(err.message, setFormStatus);
    }
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
        <section className="flex flex-col gap-4">
          <h2 className="create-edit-titles">Basic info</h2>

          <div className="flex flex-col gap-2">
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

            {formStatus.validationErrors?.image && (
              <p className="error-message">{formStatus.validationErrors.image}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <InputField
              id="name"
              name="name"
              type="text"
              labelText="Name of venue *"
              placeholder="Name of the venue"
            />
            {formStatus.validationErrors?.name && (
              <p className="error-message">{formStatus.validationErrors.name}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <InputField
              id="description"
              name="description"
              type="text"
              labelText="Description *"
              placeholder="Write a description of the venue"
              textarea
            />
            {formStatus.validationErrors?.description && (
              <p className="error-message">{formStatus.validationErrors.description}</p>
            )}
          </div>
        </section>

        {/* Pricing & Guests */}
        <section className="flex flex-col gap-4">
          <h2 className="create-edit-titles">Pricing & Guests</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <InputField
                id="price"
                name="price"
                labelText="Price *"
                type="number"
                placeholder="Enter price"
                className="input text-center"
              />

              {formStatus.validationErrors?.price && (
                <p className="error-message">{formStatus.validationErrors.price}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <InputField
                id="maxGuests"
                name="maxGuests"
                labelText="Max Guests *"
                type="number"
                placeholder="Add number of guests"
                // min={1}
                // max={100}
                step={1}
                className="input text-center"
              />

              {formStatus.validationErrors?.maxGuests && (
                <p className="error-message">{formStatus.validationErrors.maxGuests}</p>
              )}
            </div>

            <div>
              <InputField
                id="rating"
                name="rating"
                labelText="Rating"
                type="number"
                placeholder="Venue rating (1–5)"
                min={0}
                max={5}
                step={0.5}
                className="input text-center"
              />
            </div>

            {formStatus.validationErrors?.rating && (
              <p className="error-message">{formStatus.validationErrors.rating}</p>
            )}
          </div>
        </section>

        {/* Location */}
        <section className="flex flex-col gap-4">
          <h2 className="create-edit-titles">Location</h2>
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
        </section>

        {/* Amenities */}
        <section className="flex flex-col gap-4">
          <h2 className="create-edit-titles">Amenities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex w-full p-2 rounded">
              <label htmlFor="pets" className="amenities-label">
                <input
                  type="checkbox"
                  id="pets"
                  name="pets"
                  className="sr-only peer"
                  checked={amenitiesChecked.pets}
                  onChange={() => handleAmenities('pets')}
                />
                <div className="flex items-center gap-2">
                  <FaDog size={24} />
                  <span className="text-base">Pets</span>
                </div>

                <span className="amenities-checkbox">
                  {amenitiesChecked.pets && (
                    <IoCheckmarkSharp size={18} className="text-white peer-checked:bg-black" />
                  )}
                </span>
              </label>
            </div>

            <div className="flex w-full p-2 rounded">
              <label htmlFor="parking" className="amenities-label">
                <input
                  type="checkbox"
                  id="parking"
                  name="parking"
                  className="sr-only peer"
                  checked={amenitiesChecked.parking}
                  onChange={() => handleAmenities('parking')}
                />
                <div className="flex items-center gap-2">
                  <FaParking size={24} />
                  <span className="text-base">Parking</span>
                </div>

                <span className="amenities-checkbox">
                  {amenitiesChecked.parking && (
                    <IoCheckmarkSharp size={18} className="text-white peer-checked:bg-black" />
                  )}
                </span>
              </label>
            </div>

            <div className="flex w-full p-2 rounded">
              <label htmlFor="breakfast" className="amenities-label">
                <input
                  type="checkbox"
                  id="breakfast"
                  name="breakfast"
                  className="sr-only peer"
                  checked={amenitiesChecked.breakfast}
                  onChange={() => handleAmenities('breakfast')}
                />
                <div className="flex items-center gap-2">
                  <GiKnifeFork size={24} />
                  <span className="text-base">Breakfast</span>
                </div>

                <span className="amenities-checkbox">
                  {amenitiesChecked.breakfast && (
                    <IoCheckmarkSharp size={18} className="text-white peer-checked:bg-black" />
                  )}
                </span>
              </label>
            </div>

            <div className="flex w-full p-2 rounded">
              <label htmlFor="wifi" className="amenities-label">
                <input
                  type="checkbox"
                  id="wifi"
                  name="wifi"
                  className="sr-only peer"
                  checked={amenitiesChecked.wifi}
                  onChange={() => handleAmenities('wifi')}
                />
                <div className="flex items-center gap-2">
                  <FaWifi size={24} />
                  <span className="text-base">Free Wifi</span>
                </div>

                <span className="amenities-checkbox">
                  {amenitiesChecked.wifi && (
                    <IoCheckmarkSharp size={18} className="text-white peer-checked:bg-black" />
                  )}
                </span>
              </label>
            </div>
          </div>
        </section>
        <div className="flex flex-col items-center justify-center gap-5">
          <button type="submit" className="button transition font-bold">
            Create venue
          </button>
          {formStatus.success && (
            <div id="createSuccess" className="success-message">
              {formStatus.success}
            </div>
          )}
          {formStatus.submitError && (
            <div id="createError" className="error-message">
              {formStatus.submitError}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
