import { useState } from 'react';
import { FaDog, FaParking } from 'react-icons/fa';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { PiPlusCircle } from 'react-icons/pi';
import { FaWifi } from 'react-icons/fa6';
import { GiKnifeFork } from 'react-icons/gi';
import { Media } from '../Types/common';
import { GalleryComponent } from '../Components/gallery';
import { InputField } from '../Components/InputField';
import { editSubmit } from '../UI/venue/edit';
import { useNavigate } from 'react-router-dom';

const title = 'text-xl md:text-2xl lg:text-3xl pb-2 border-b border-brand-grey mb-2 md:mb-8';
const amenitiesLabel = 'grid grid-cols-2 md:flex md:gap-5 items-center w-full cursor-pointer';
const amenitiesCheckbox =
  'w-6 h-6 border-1 bg-white border-black rounded-md flex items-center justify-center peer-checked:bg-black';

export const EditPage = () => {
  const venueData = localStorage.getItem('editVenue');
  const venue = venueData ? JSON.parse(venueData) : null;

  const [media, setMedia] = useState<Media[]>(venue?.media || []);
  const [imageInput, setImageInput] = useState('');
  const [imageLimitReached, setImageLimitReached] = useState(false);
  const [formData, setFormData] = useState({
    name: venue?.name || '',
    description: venue?.description || '',
    price: venue?.price || '',
    maxGuests: venue?.maxGuests || '',
    rating: venue?.rating || '',
    address: venue?.location?.address || '',
    city: venue?.location?.city || '',
    zip: venue?.location?.zip || '',
    country: venue?.location?.country || '',
    wifi: venue?.meta?.wifi || false,
    parking: venue?.meta?.parking || false,
    breakfast: venue?.meta?.breakfast || false,
    pets: venue?.meta?.pets || false,
  });

  const handleRemoveImage = (url: string) => {
    setMedia((prev) => prev.filter((image) => image.url !== url));
  };

  const handleAddImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!imageInput.trim()) return;

    if (media.length >= 8) {
      setImageLimitReached(true);
      setTimeout(() => setImageLimitReached(false), 5000);
      return;
    }

    setMedia((prev) => [...prev, { url: imageInput.trim(), alt: 'venue image' }]);
    setImageInput('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();

    for (const key in formData) {
      form.append(key, String(formData[key as keyof typeof formData]));
    }

    try {
      const result = await editSubmit(form, media, venue.id); // assume this returns updated venue
      if (result) {
        navigate(`/venues?id=${venue.id}`); // redirect to the updated venue page
      }
    } catch (error) {
      console.error('Failed to edit venue:', error);
      // optionally show error UI
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
            value={formData.name}
            onChange={handleChange}
          />

          <InputField
            id="description"
            name="description"
            type="text"
            labelText="Description"
            placeholder="Write a description of the venue"
            textarea
            value={formData.description}
            onChange={handleChange}
          />
        </div>

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
              value={formData.price}
              onChange={handleChange}
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
              value={formData.maxGuests}
              onChange={handleChange}
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
              value={formData.rating}
              onChange={handleChange}
            />
          </div>
        </div>

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
              value={formData.address}
              onChange={handleChange}
            />

            <InputField
              id="city"
              name="city"
              labelText="City"
              type="text"
              placeholder="Bergen"
              className="input"
              value={formData.city}
              onChange={handleChange}
            />

            <InputField
              id="zip"
              name="zip"
              labelText="Zip-Code"
              type="text"
              placeholder="1010"
              className="input"
              value={formData.zip}
              onChange={handleChange}
            />

            <InputField
              id="country"
              name="country"
              labelText="Country"
              type="text"
              placeholder="Dreamland"
              className="input"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className={title}>Amenities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'pets', label: 'Pets', icon: <FaDog size={24} /> },
              { id: 'parking', label: 'Parking', icon: <FaParking size={24} /> },
              { id: 'breakfast', label: 'Breakfast', icon: <GiKnifeFork size={24} /> },
              { id: 'wifi', label: 'Free Wifi', icon: <FaWifi size={24} /> },
            ].map((item) => (
              <div className="flex w-full p-2 rounded" key={item.id}>
                <label htmlFor={item.id} className={amenitiesLabel}>
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-base">{item.label}</span>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id={item.id}
                      name={item.id}
                      checked={formData[item.id as keyof typeof formData] as boolean}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <span className={amenitiesCheckbox}>
                      <IoCheckmarkSharp
                        size={18}
                        className="text-white hidden peer-checked:block"
                      />
                    </span>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="button transition font-bold">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
