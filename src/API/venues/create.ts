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

  if (!response.ok) {
    const message = result?.errors?.[0]?.message || result?.message || 'Failed to create venue';
    throw new Error(message);
  }

  return result;
};
