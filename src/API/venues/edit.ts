import { headers } from '../headers';
import { Venue } from '../../Types/common';
import { API } from '../endpoints';

export const editVenue = async (data: Venue, id: string) => {
  const response = await fetch(`${API.VENUES}/${id}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log('Request body:', result);

  if (!response.ok) {
    const message = result?.errors?.[0]?.message || result?.message || 'Failed to update venue';
    throw new Error(message);
  } else if (response.ok) {
    console.log('Venue edited successfully:', response);
    return result;
  }
};
