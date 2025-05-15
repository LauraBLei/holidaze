import { API } from '../endpoints';
import { headers } from '../headers';

type RegisterForm = {
  name: FormDataEntryValue;
  email: FormDataEntryValue;
  password: FormDataEntryValue;
  isVenueManager: boolean;
};

/**
 * Sends a registration request to the API.
 *
 * @param {Object} params - Registration details.
 * @param {FormDataEntryValue} params.name - User's full name.
 * @param {FormDataEntryValue} params.email - User's email address.
 * @param {FormDataEntryValue} params.password - User's password.
 * @param {boolean} params.isVenueManager - Whether the user is a venue manager.
 * @returns {Promise<Object>} Resolves with the API response data on success.
 * @throws {Error} Throws an error if the API response is not ok.
 */
export const fetchRegister = async ({
  name,
  email,
  password,
  isVenueManager,
}: RegisterForm): Promise<object> => {
  const body = {
    name,
    email,
    password,
    venueManager: isVenueManager,
  };

  const response = await fetch(API.AUTH_REGISTER, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    const message =
      data?.errors?.[0]?.message || data?.message || 'Failed to register. Please try again';
    throw new Error(message);
  }

  return data;
};
