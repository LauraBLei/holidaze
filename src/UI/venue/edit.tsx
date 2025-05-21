import { editVenue } from '../../API/venues/edit';
import { Media, Venue } from '../../Types/common';

/**
 * Builds the payload object for editing an existing venue from the form data and media.
 *
 * This function processes the form data and media to construct a venue object that includes
 * the necessary properties such as venue name, description, pricing, location, and meta data.
 *
 * @param {FormData} formdata - The form data object containing the venue editing fields.
 * @param {Media[]} media - An array of media items (e.g., images, videos) associated with the venue.
 *
 * @returns {Venue} The formatted venue object ready to be sent to the server for editing.
 */
const buildVenueEditPayload = (formdata: FormData, media: Media[]): Venue => ({
  media,
  name: formdata.get('venueName')?.toString() || '',
  description: formdata.get('description')?.toString() || '',

  price: Number(formdata.get('price')),
  maxGuests: Number(formdata.get('maxGuests')),
  rating: Number(formdata.get('rating')),

  location: {
    address: formdata.get('address')?.toString() || '',
    city: formdata.get('city')?.toString() || '',
    zip: formdata.get('zip')?.toString() || '',
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
 * Handles the form submission for editing an existing venue.
 *
 * This function validates the form data, builds the payload object, and then calls
 * the API to edit the venue.
 *
 * @param {FormData} formdata - The form data object containing the venue editing fields.
 * @param {Media[]} media - An array of media items (e.g., images, videos) associated with the venue.
 * @param {string} id - The ID of the venue to be edited.
 *
 * @returns {Promise<any>} The result of the venue edit request, which is handled by `editVenue`.
 */
export const handleEditSubmit = async (formdata: FormData, media: Media[], id: string) => {
  const payload = buildVenueEditPayload(formdata, media);
  return await editVenue(payload, id);
};
