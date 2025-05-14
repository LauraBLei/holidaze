import { Venue } from '../../Types/common';
import { API } from '../endpoints';
import { headers } from '../headers';

/**
 * Fetches a list of venues from the API and updates the state with the result.
 *
 * @param {Function} setVenues - The function to update the state with the fetched venues data.
 * @returns {Promise<void>} A promise that resolves when the venues data is fetched and state is updated.
 * @throws {Error} If the request fails, an error is logged to the console.
 */

export const ReadVenues = async (setVenues: (input: Venue[]) => void) => {
  try {
    const response = await fetch(
      `${API.VENUES}?sort=created&sortOrder=desc&_owner=true&_bookings=true`,
      {
        method: 'GET',
        headers: headers(),
      },
    );
    if (response.ok) {
      const venues = await response.json();

      setVenues(venues.data);
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
