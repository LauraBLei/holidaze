import { headers } from '../../API/headers';
import { VenueCreate } from '../../Types/common';
import { API } from '../endpoints';

export const HandleCreateVenue = async (data: VenueCreate) => {
  const response = await fetch(API.VENUES, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log('Request body:', result);

  if (!response.ok) {
    throw new Error('Failed to create venue');
  } else {
    console.log('Venue created successfully:', response);
  }

  return result;
};
