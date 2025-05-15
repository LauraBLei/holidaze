import { API } from './endpoints';

export const storedUser = localStorage.getItem('User');
export const storedUserData = JSON.parse(storedUser || '{}');
export const accessToken = storedUserData.accessToken;

/**
 * Constructs and returns the headers object for making API requests.
 * The headers will include the Noroff API key (if available) and
 * the Authorization header with a Bearer token (if the user is logged in).
 *
 * @returns {Headers} The headers object to be used in API requests.
 */

export function headers() {
  const headers = new Headers();

  if (API.KEY) {
    headers.append('X-Noroff-API-Key', API.KEY);
  }

  if (accessToken) {
    const token = 'Bearer ' + accessToken;
    headers.append('Authorization', token);
  }
  headers.append('content-Type', 'application/json');

  return headers;
}
