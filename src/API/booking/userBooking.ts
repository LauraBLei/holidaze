import { APIBookingData } from '../../Types/common';
import { API } from '../endpoints';
import { headers, storedUserData } from '../headers';

interface readUserBookingsProps {
  page: number;
  limit: number;

  setAPIData: (input: APIBookingData) => void;
}

/**
 * Fetches a paginated list of bookings for the currently logged-in user.
 * The bookings are sorted by creation date in descending order and include associated venue data.
 *
 * @param {Object} params - Parameters for fetching bookings.
 * @param {number} params.page - The current page number of bookings to fetch.
 * @param {number} params.limit - The number of bookings to fetch per page.
 * @param {(input: APIBookingData) => void} params.setAPIData - A callback function to set the fetched booking data.
 *
 * @returns {Promise<void>} A promise that resolves when the data is fetched and `setAPIData` has been called.
 *
 * @example
 * readUserBookings({
 *   page: 1,
 *   limit: 10,
 *   setAPIData: (data) => console.log(data),
 * });
 */
export const readUserBookings = async ({ page, limit, setAPIData }: readUserBookingsProps) => {
  const params = new URLSearchParams({
    sort: 'created',
    sortOrder: 'desc',
    page: page.toString(),
    limit: limit.toString(),
    _venue: 'true',
  });
  const user = storedUserData;

  try {
    const response = await fetch(`${API.PROFILES}/${user.name}/bookings?${params.toString()}`, {
      method: 'GET',
      headers: headers(),
    });
    if (response.ok) {
      const bookings = await response.json();
      setAPIData(bookings);
    }
  } catch (error) {
    console.error('readUserBookings: Network or server error occurred.', error);
  }
};
