import { API } from '../endpoints';
import { headers } from '../headers';
/**
 * Deletes a venue by sending a DELETE request to the API.
 *
 * @param {string} id - The unique identifier of the venue to be deleted.
 * @returns {Promise<void>} A promise that resolves when the venue is deleted successfully.
 * @throws {Error} If the request fails, logs the error to the console.
 */

export const deleteVenue = async (id: string) => {
  try {
    const response = await fetch(API.VENUES + '/' + id, {
      method: 'DELETE',
      headers: headers(),
    });
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
