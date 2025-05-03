import { HandleCreateVenue } from '../../API/venues/create';
import { Media } from '../../Types/common';

export const handleCreateVenueSubmit = (formdata: FormData, media: Media[]) => {
  const name = formdata.get('name');
  const description = formdata.get('description');
  const price = formdata.get('price');
  const maxGuests = formdata.get('maxGuests');

  console.log('📦 Venue form data:', { media, name, description, price, maxGuests });

  try {
    HandleCreateVenue({
      media,
      name: name?.toString() || '',
      description: description?.toString() || '',
      price: Number(price),
      maxGuests: Number(maxGuests),
    });
  } catch (error) {
    console.error('Venue creation failed:', error);
  }
};
