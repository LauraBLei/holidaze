import { HandleCreateVenue } from '../../API/venues/create';

export const handleCreateVenueSubmit = (formdata: FormData) => {
  const name = formdata.get('name');
  const description = formdata.get('description');
  const price = formdata.get('price');
  const maxGuests = formdata.get('maxGuests');

  console.log('📦 Venue form data:', { name, description, price, maxGuests });

  try {
    HandleCreateVenue({
      name: name?.toString() || '',
      description: description?.toString() || '',
      price: Number(price),
      maxGuests: Number(maxGuests),
    });
    console.log('🌛 Venue form data:', { name, description, price, maxGuests });
  } catch (error) {
    console.error('Venue creation failed:', error);
  }
};
