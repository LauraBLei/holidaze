import { accessToken } from '../Constants/constants';
import { API } from './endpoints';

export const storedUser = localStorage.getItem('User');
export const storedUserData = JSON.parse(storedUser || '{}');
export const accessToken = storedUserData.accessToken;

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
