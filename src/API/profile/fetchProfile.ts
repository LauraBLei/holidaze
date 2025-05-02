import { API } from '../endpoints';

export default async function fetchProfile() {
  const urlSearch = new URLSearchParams(window.location.search);
  const profileId = urlSearch.get('username');

  const storedUser = localStorage.getItem('User');
  const userData = JSON.parse(storedUser);
  const accessToken = userData.accessToken;

  try {
    const response = await fetch(`${API.PROFILES}/${profileId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': API.KEY,
      },
    });
    const data = await response.json();

    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
