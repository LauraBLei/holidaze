// import { CreateVenueForm } from '../Components/CreateVenue';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeOutOnlyVariants } from '../Constants/constants';
import { useState } from 'react';
import { Media, Meta } from '../Types/common';
import { handleCreateVenueSubmit } from '../UI/venue/create';
import { GalleryComponent } from '../Components/GalleryComponent';
import { InputField } from '../Components/InputField';
import { useNavigate } from 'react-router-dom';
import { runVenueValidations } from '../utilities/validation/runVenueValidations';
import { validateImage } from '../utilities/validation/validateVenue';
import {
  defaultStatus,
  setSubmitError,
  setSuccessMessage,
  StatusMessage,
} from '../utilities/validation/validation';
import { Check, ParkingSquare, PawPrint, Plus, Utensils, Wifi } from 'lucide-react';
import { TextCounter } from '../Components/TextCounter';

/**
 * CreatePage Component
 *
 * Renders a form for creating a new venue. The form allows users to:
 * - Add media (image URLs)
 * - Enter venue details including name, description, pricing, guests, and location
 * - Select available amenities (WiFi, parking, pets, breakfast)
 *
 * Features:
 * - Validates input fields and media before submission
 * - Displays success or error messages based on the result
 * - On success, navigates to the newly created venue's detail page
 *
 * @component
 * @returns {JSX.Element} The form UI for creating a new venue
 */

const CreatePage = () => {
  const navigate = useNavigate();
  const [media, setMedia] = useState<Media[]>([]);
  const [imageInput, setImageInput] = useState('');
  const [formStatus, setFormStatus] = useState<StatusMessage>(defaultStatus);
  const [textCount, setTextCount] = useState<number>(0);
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

    const isValid = validateImage(imageInput, media.length, setFormStatus);
    if (!isValid) return;

    setMedia((prev) => [...prev, { url: imageInput.trim(), alt: 'venue image' }]);
    setImageInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget as HTMLFormElement);

    const isValid = runVenueValidations(formdata, setFormStatus);
    if (!isValid) return;

    try {
      const result = await handleCreateVenueSubmit(formdata, media);
      setSuccessMessage('Venue created successfully!', setFormStatus);
      console.log('result', result.id);

      if (result && result.id) {
        setTimeout(() => {
          navigate(`/venues?id=${result.id}`);
        }, 2000);
      }
    } catch (error) {
      console.error('Venue creation failed:', error);
      const err = error as Error;
      setSubmitError(err.message, setFormStatus);
    }
  };

  useEffect(() => {
    document.title = 'Holidaze - New Venue';
  }, []);

  return (
    <motion.div
      variants={fadeOutOnlyVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-[1000px] w-full h-full flex flex-col justify-center font-primary"
    >
      <section className="w-full flex flex-col items-center justify-center">
        <h1 className="headlineOne mt-7 md:mt-16">Create your new Venue</h1>
        <form
          className="max-w-[1000px] w-full h-full flex flex-col justify-center font-primary"
          onSubmit={handleSubmit}
        >
          <div className="mx-5 flex flex-col mb-10 gap-12 md:gap-28">
            <div className="h-full flex flex-col gap-4 mt-10">
              {media.length > 0 && (
                <GalleryComponent
                  media={media}
                  onRemoveImage={handleRemoveImage}
                  isEditable={true}
                />
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
                  icon={<Plus size={24} />}
                  onChange={(e) => setImageInput(e.target.value)}
                  onButtonClick={handleAddImage}
                />

                {formStatus.validationErrors?.image && (
                  <p className="error-message">{formStatus.validationErrors.image}</p>
                )}
                {formStatus.successMessages?.image && (
                  <div className="success-message">{formStatus.successMessages.image}</div>
                )}
              </div>

              {[
                {
                  id: 'venueName',
                  labelText: 'Name of venue *',
                  placeholder: 'Name of the venue',
                  type: 'text',
                },
                {
                  id: 'description',
                  labelText: 'Description *',
                  placeholder: 'Write a description of the venue',
                  type: 'text',
                  textarea: true,
                  counter: true,
                },
              ].map((item) => (
                <div key={item.id} className="flex flex-col gap-2">
                  <InputField
                    id={item.id}
                    name={item.id}
                    type={item.type}
                    labelText={item.labelText}
                    placeholder={item.placeholder}
                    textarea={item.textarea}
                    onChange={(e) => setTextCount(e.target.value.length)}
                  />

                  {formStatus.validationErrors?.[item.id] && (
                    <p className="error-message">{formStatus.validationErrors[item.id]}</p>
                  )}
                  {item.counter && <TextCounter count={textCount} maxCharacters={1000} />}
                </div>
              ))}
            </section>

            {/* Pricing & Guests */}
            <section className="flex flex-col gap-4">
              <h2 className="create-edit-titles">Pricing & Guests</h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'price', label: 'Price *', placeholder: 'Enter price', type: 'number' },
                  {
                    id: 'maxGuests',
                    label: 'Max Guests *',
                    placeholder: 'Add number of guests',
                    type: 'number',
                  },
                  {
                    id: 'rating',
                    label: 'Rating',
                    placeholder: '1-5',
                    type: 'number',
                    step: 0.5,
                    max: 5,
                  },
                ].map((item) => (
                  <div className="flex flex-col gap-2" key={item.id}>
                    <InputField
                      id={item.id}
                      name={item.id}
                      labelText={item.label}
                      type={item.type}
                      placeholder={item.placeholder}
                      className="input"
                      step={item.step}
                      max={item.max}
                    />
                    {formStatus.validationErrors?.[item.id] && (
                      <p className="error-message">{formStatus.validationErrors[item.id]}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Location */}
            <section className="flex flex-col gap-4">
              <h2 className="create-edit-titles">Location</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'address', label: 'Address', placeholder: 'Imaginary street 123' },
                  { id: 'city', label: 'City', placeholder: 'Bergen' },
                  { id: 'zip', label: 'Zip-Code', placeholder: '1010' },
                  { id: 'country', label: 'Country', placeholder: 'Dreamland' },
                ].map((item) => (
                  <div className="flex flex-col gap-2" key={item.id}>
                    <InputField
                      id={item.id}
                      name={item.id}
                      labelText={item.label}
                      type="text"
                      placeholder={item.placeholder}
                      className="input"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Amenities */}
            <section className="flex flex-col gap-4">
              <h2 className="create-edit-titles">Amenities map</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: 'pets', label: 'Pets', icon: <PawPrint size={24} /> },
                  { id: 'parking', label: 'Parking', icon: <ParkingSquare size={24} /> },
                  { id: 'breakfast', label: 'Breakfast', icon: <Utensils size={24} /> },
                  { id: 'wifi', label: 'Free Wifi', icon: <Wifi size={24} /> },
                ].map((item) => (
                  <div className="flex w-full p-2 rounded" key={item.id}>
                    <label htmlFor={item.id} className="amenities-label">
                      <input
                        type="checkbox"
                        id={item.id}
                        name={item.id}
                        className="sr-only peer"
                        checked={amenitiesChecked[item.id as keyof typeof amenitiesChecked]}
                        onChange={() => handleAmenities(item.id as keyof typeof amenitiesChecked)}
                      />
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span className="text-base">{item.label}</span>
                      </div>

                      <span className="amenities-checkbox">
                        <Check size={18} className="text-white" />
                      </span>
                    </label>
                  </div>
                ))}
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
          </div>
        </form>
      </section>
    </motion.div>
  );
};

export default CreatePage;
