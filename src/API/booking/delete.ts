import { API } from '../endpoints';
import { headers } from '../headers';

/**
 * Deletes a booking by its ID.
 *
 * Sends a DELETE request to the bookings API endpoint using the provided booking ID.
 *
 * @param {string} id - The ID of the booking to delete.
 * @returns {Promise<Response | undefined>} A promise that resolves with the fetch response if successful, or `undefined` if an error occurs or the response is not OK.
 *
 * @example
 * const result = await deleteBooking('booking123');
 * if (result?.ok) {
 *   console.log('Booking deleted successfully');
 * }
 */
export const deleteBooking = async (id: string) => {
  try {
    const response = await fetch(`${API.BOOKINGS}/${id}`, {
      method: 'DELETE',
      headers: headers(),
    });

    if (response.ok) {
      return response;
    }
  } catch (error) {
    console.error('deleteBooking: Network or server error occurred.', error);
  }
};
