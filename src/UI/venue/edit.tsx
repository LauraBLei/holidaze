import { editVenue } from '../../API/venues/edit';
import { Media, Venue } from '../../Types/common';

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

export const handleEditSubmit = async (formdata: FormData, media: Media[], id: string) => {
  const payload = buildVenueEditPayload(formdata, media);
  return await editVenue(payload, id);
};
