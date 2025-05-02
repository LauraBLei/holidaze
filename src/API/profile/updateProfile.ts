import { API } from '../endpoints';
import { storedBanner, storedBio, storedPFP, accessToken } from '../../Constants/constants';

export async function HandleUpdateProfile(formdata: FormData) {
  const urlSearch = new URLSearchParams(window.location.search);
  const profileId = urlSearch.get('username');

  const payload = {
    bio: formdata?.get('bio') || storedBio,
    avatar: {
      url: formdata?.get('url') || storedPFP,
      alt: '',
    },
    banner: {
      url: formdata?.get('banner') || storedBanner,
      alt: '',
    },
    venueManager: formdata.get('venueManager') === 'true',
  };

  console.log(payload);

  const response = await fetch(`${API.PROFILES}/${profileId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-Noroff-API-Key': API.KEY,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorData = data;
    throw new Error(`Failed to update profile: ${errorData.message}`);
  }

  if (response.ok) {
    const existingUser = JSON.parse(localStorage.getItem('User') || '{}');
    const updatedUser = { ...existingUser, ...data.data };
    localStorage.setItem('User', JSON.stringify(updatedUser));
  }

  return data.data;
}
