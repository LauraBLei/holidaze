import { APIVenueData } from '../../Types/common';
import { API } from '../endpoints';
import { headers } from '../headers';

interface readVenuesProps {
  page: number;
  limit: number;
  setAPIData: (input: APIVenueData) => void;
  text: string;
}

/**
 * Searches for venues based on a query string and pagination.
 *
 * Sends a GET request to the venues search API endpoint with pagination and search query.
 * The response is passed to the `setAPIData` callback if the request is successful.
 *
 * @param {Object} props - The parameters for the search.
 * @param {number} props.page - The page number to fetch.
 * @param {number} props.limit - The number of venues per page.
 * @param {string} props.text - The search query text.
 * @param {(input: APIVenueData) => void} props.setAPIData - Callback to handle the API response data.
 *
 * @returns {Promise<void>} A promise that resolves when the API call completes.
 *
 * @example
 * await searchVenues({
 *   page: 1,
 *   limit: 10,
 *   text: 'beach',
 *   setAPIData: (data) => console.log(data),
 * });
 */

export const searchVenues = async ({ page, limit, setAPIData, text }: readVenuesProps) => {
  if (!text) {
    return;
  }
  const params = new URLSearchParams({
    sort: 'created',
    sortOrder: 'desc',
    page: page.toString(),
    limit: limit.toString(),
    q: text,
  });
  try {
    const response = await fetch(API.VENUES_SEARCH + '?' + params, {
      method: 'GET',
      headers: headers(),
    });

    if (response.ok) {
      const venues = await response.json();
      setAPIData(venues);
    }
  } catch (error) {
    console.error('searchVenues: An unexpected error occurred.', error);
  }
};
