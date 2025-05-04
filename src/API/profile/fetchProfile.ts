import { API } from '../endpoints';
import { accessToken } from '../../Constants/constants';

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
