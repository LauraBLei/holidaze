import { useState } from 'react';
import { FaDog, FaParking } from 'react-icons/fa';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { PiPlusCircle } from 'react-icons/pi';
import { Media } from '../Types/common';
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

const title = 'text-xl md:text-2xl lg:text-3xl pb-2 border-b border-brand-grey mb-2 md:mb-8';
const amenitiesLabel = 'grid grid-cols-2 md:flex md:gap-5 items-center w-full cursor-pointer';
const amenitiesCheckbox =
  'w-6 h-6 border-1 bg-white border-black rounded-md flex items-center justify-center peer-checked:bg-black';

export const CreateVenueForm = () => {
  const navigate = useNavigate();
  const [media, setMedia] = useState<Media[]>([]);
  const [imageInput, setImageInput] = useState('');
  const [formStatus, setFormStatus] = useState<StatusMessage>(defaultStatus);

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

    if (media.length >= 2) {
      setValidationError('image', 'You can only add up to 8 images.', setFormStatus);
      return;
    }

    setMedia((prev) => [...prev, { url: trimmedUrl, alt: 'venue image' }]);
    setImageInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget as HTMLFormElement);

    const name = formdata.get('name')?.toString() || '';
    const description = formdata.get('description')?.toString() || '';
    const price = Number(formdata.get('price'));
    const maxGuests = Number(formdata.get('maxGuests'));

    if (name === '') {
      setValidationError('name', 'Please enter a venue name', setFormStatus);
      const field = document.getElementById('name');
      if (field) {
        field.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (field as HTMLElement).focus();
      }
      return;
    }

    if (description === '') {
      setValidationError('description', 'Please enter a description', setFormStatus);
      const field = document.getElementById('description');
      if (field) {
        field.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (field as HTMLElement).focus();
      }
      return;
    }

    if (price < 1 || price > 10000) {
      setValidationError('price', 'Price must be between 1 and 10000.', setFormStatus);
      const field = document.getElementById('price');
      if (field) {
        field.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (field as HTMLElement).focus();
      }
      return;
    }

    if (maxGuests < 1 || maxGuests > 100) {
      setValidationError('maxGuests', 'Guests must be between 1 and 100.', setFormStatus);
      const field = document.getElementById('maxGuests');
      if (field) {
        field.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (field as HTMLElement).focus();
      }
      return;
    }

    try {
      await handleCreateVenueSubmit(formdata, media);
      setSuccessMessage('Venue created successfully!', setFormStatus);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Venue creation failed:', error);
      setSubmitError('Failed to create venue. Please try again.', setFormStatus);
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
        <div className="flex flex-col gap-4">
          <h2 className={title}>Basic info</h2>

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
        </div>

        {/* Pricing & Guests */}
        <div className="flex flex-col gap-4">
          <h2 className={title}>Pricing & Guests</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <InputField
                id="price"
                name="price"
                labelText="Price *"
                type="number"
                placeholder="Enter price"
                className="input text-center"
                min={0}
                max={10000}
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
                min={1}
                max={100}
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
                step={1}
                className="input text-center"
              />
            </div>

            {formStatus.validationErrors?.rating && (
              <p className="error-message">{formStatus.validationErrors.rating}</p>
            )}
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
                  <GiKnifeFork size={24} />
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
                  <FaWifi size={24} />
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
