import { headers } from '../../API/headers';
import { API } from '../endpoints';

type CreateVenueData = {
  name: FormDataEntryValue;
  description: FormDataEntryValue;
  price: number;
  maxGuests: number;
};

export const HandleCreateVenue = async ({
  name,
  description,
  price,
  maxGuests,
}: CreateVenueData) => {
  const response = await fetch(API.VENUES, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ name, description, price, maxGuests }),
  });

  const data = await response.json();
  console.log('Request body:', data);
  console.log('Response:', response.body);

  if (!response.ok) {
    throw new Error('Failed to create venue');
  } else {
    console.log('Venue created successfully:', response);
  }

  return data;
};
