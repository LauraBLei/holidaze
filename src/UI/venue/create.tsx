import { HandleCreateVenue } from '../../API/venues/create';
import { Media, Venue } from '../../Types/common';

/**
 * Builds the payload object for creating a new venue from the form data and media.
 *
 * This function processes the form data and media to construct a venue object that includes
 * the necessary properties such as venue name, description, pricing, location, and meta data.
 *
 * @param {FormData} formdata - The form data object containing the venue creation fields.
 * @param {Media[]} media - An array of media items (e.g., images, videos) associated with the venue.
 *
 * @returns {Venue} The formatted venue object ready to be sent to the server.
 */
const buildVenueCreatePayload = (formdata: FormData, media: Media[]): Venue => ({
  media,
  name: formdata.get('name')?.toString() || '',
  description: formdata.get('description')?.toString() || '',

  price: Number(formdata.get('price')),
  maxGuests: Number(formdata.get('maxGuests')),
  rating: Number(formdata.get('rating')),

  location: {
    address: formdata.get('address')?.toString() || '',
    city: formdata.get('city')?.toString() || '',
    zip: formdata.get('zip-code')?.toString() || '',
    country: formdata.get('country')?.toString() || '',
  },

  meta: {
    wifi: !!formdata.get('wifi'),
    parking: !!formdata.get('parking'),
    breakfast: !!formdata.get('breakfast'),
    pets: !!formdata.get('pets'),
  },
});

/**
 * Handles the form submission for creating a new venue.
 *
 * This function validates the form data, builds the payload object, and then calls
 * the API to create the venue.
 *
 * @param {FormData} formdata - The form data object containing the venue creation fields.
 * @param {Media[]} media - An array of media items (e.g., images, videos) associated with the venue.
 *
 * @returns {Promise<any>} The result of the venue creation request, which is handled by `HandleCreateVenue`.
 */
export const handleCreateVenueSubmit = async (formdata: FormData, media: Media[]) => {
  const payload = buildVenueCreatePayload(formdata, media);

  return await HandleCreateVenue(payload);
};
