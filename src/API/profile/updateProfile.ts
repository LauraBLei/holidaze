import { API } from '../endpoints';
import { storedBanner, storedBio, storedPFP, accessToken } from '../../Constants/constants';
/**
 * Updates the user's profile information including bio, avatar, banner, and venue manager status.
 *
 * Retrieves the current `username` from the URL to target the correct profile.
 * Falls back to stored constants if form data is missing.
 * Sends an authenticated PUT request to the profile endpoint and updates localStorage with the new profile data.
 * Reloads the page on success.
 *
 * @param {FormData} formdata - The form data containing updated profile fields: `bio`, `url`, `banner`, and `venueManager`.
 * @returns {Promise<any>} The updated profile data.
 * @throws {Error} If the update request fails.
 */

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
    window.location.reload();
  }

  return data.data;
}
