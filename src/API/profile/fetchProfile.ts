import { API } from '../endpoints';
import { accessToken } from '../../Constants/constants';

/**
 * Fetches a user profile including their bookings and venues based on the `username` query parameter in the URL.
 *
 * Sends an authenticated GET request to the profile endpoint using the access token and API key.
 *
 * @returns {Promise<any>} The profile data including bookings and venues, or logs an error if the request fails.
 */

export default async function fetchProfile() {
  const urlSearch = new URLSearchParams(window.location.search);
  const profileName = urlSearch.get('username');

  try {
    const response = await fetch(`${API.PROFILES}/${profileName}?_bookings=true&_venues=true`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': API.KEY,
      },
    });
    const data = await response.json();

    console.log(data);

    return data.data;
  } catch (error) {
    console.log(error);
  }
}
