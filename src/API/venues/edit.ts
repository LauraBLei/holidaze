import { headers } from '../headers';
import { Venue } from '../../Types/common';
import { API } from '../endpoints';
/**
 * Edits an existing venue by sending a PUT request to the API.
 *
 * @param {Venue} data - The venue data to update, including fields like name, description, etc.
 * @param {string} id - The unique identifier of the venue to be updated.
 * @returns {Promise<any>} A promise that resolves to the response data if the venue is updated successfully.
 * @throws {Error} If the request fails, throws an error with a message.
 */

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
