import { headers } from '../../API/headers';
import { Venue } from '../../Types/common';
import { API } from '../endpoints';

/**
 * Creates a new venue by sending a POST request to the API with venue data.
 *
 * @param {Venue} data - The venue data to be submitted (e.g., name, location, description, price, etc.).
 * @returns {Promise<any>} The response data from the API if creation is successful.
 * @throws {Error} If the request fails, throws an error with the returned message or a fallback message.
 */

export const HandleCreateVenue = async (data: Venue) => {
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

  return result.data;
};
