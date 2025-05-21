import { Venue } from '../../Types/common';
import { API } from '../endpoints';
import { headers } from '../headers';
interface readVenuesProps {
  page: number;
  limit: number;
  setVenues: (input: Venue[]) => void;
  setTotalCount: (input: number) => void;
}
/**
 * Fetches a list of venues from the API and updates the state with the result.
 *
 * @param {Function} setVenues - The function to update the state with the fetched venues data.
 * @returns {Promise<void>} A promise that resolves when the venues data is fetched and state is updated.
 * @throws {Error} If the request fails, an error is logged to the console.
 */

export const ReadVenues = async ({ page, limit, setVenues, setTotalCount }: readVenuesProps) => {
  const params = new URLSearchParams({
    sort: 'created',
    sortOrder: 'desc',
    page: page.toString(),
    limit: limit.toString(),
  });
  try {
    const response = await fetch(`${API.VENUES}?${params}`, {
      method: 'GET',
      headers: headers(),
    });
    if (response.ok) {
      const venues = await response.json();

      setVenues(venues.data);
      setTotalCount(venues.meta.totalCount);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

/**
 * Fetches a single venue's data from the API by its ID and updates the state with the result.
 * Additionally, updates the document title with the venue's name.
 *
 * @param {string} id - The unique identifier of the venue to be fetched.
 * @param {Function} setVenue - The function to update the state with the fetched venue data.
 * @returns {Promise<void>} A promise that resolves when the venue data is fetched and state is updated.
 * @throws {Error} If the request fails, an error is logged to the console.
 */

export const ReadVenue = async (id: string, setVenue: (input: Venue) => void) => {
  const queryStrings = '?&_owner=true&_bookings=true';
  try {
    const response = await fetch(API.VENUES + '/' + id + queryStrings, {
      method: 'GET',
      headers: headers(),
    });
    if (response.ok) {
      const venue = await response.json();
      setVenue(venue.data);
      if (venue.data) {
        document.title = `HAL - ${venue.data.name}`;
      }
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

interface readUserVenuesProps {
  page: number;
  limit: number;
  setVenues: (input: Venue[]) => void;
  setTotalCount: (input: number) => void;
  name: string;
}

export const ReadUserVenues = async ({
  page,
  limit,
  setVenues,
  setTotalCount,
  name,
}: readUserVenuesProps) => {
  const params = new URLSearchParams({
    sort: 'created',
    sortOrder: 'desc',
    page: page.toString(),
    limit: limit.toString(),
    _owner: 'true',
  });

  try {
    const response = await fetch(`${API.PROFILES}/${name}/venues?${params}`, {
      method: 'GET',
      headers: headers(),
    });
    if (response.ok) {
      const venues = await response.json();

      setVenues(venues.data);
      setTotalCount(venues.meta.totalCount);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};
