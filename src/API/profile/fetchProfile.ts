import { API } from '../endpoints';
import { accessToken } from '../../Constants/constants';

export default async function fetchProfile() {
  const urlSearch = new URLSearchParams(window.location.search);
  const profileName = urlSearch.get('username');

  try {
    const response = await fetch(`${API.PROFILES}/${profileName}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': API.KEY,
      },
    });
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.log(error);
  }
}
