import { headers } from '../../API/headers';
import { Media } from '../../Types/common';
import { API } from '../endpoints';

type CreateVenueData = {
  media: Media[];
  name: FormDataEntryValue;
  description: FormDataEntryValue;
  price: number;
  maxGuests: number;
};

export const HandleCreateVenue = async ({
  media,
  name,
  description,
  price,
  maxGuests,
}: CreateVenueData) => {
  const response = await fetch(API.VENUES, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ media, name, description, price, maxGuests }),
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
