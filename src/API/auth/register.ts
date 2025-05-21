import { API } from '../endpoints';
import { headers } from '../headers';

/**
 * Handles user registration by sending a POST request with user details.
 *
 * Displays appropriate messages for success, existing user error, or general catch error.
 *
 * @param {Object} params - The registration form data.
 * @param {FormDataEntryValue} params.name - The name of the user.
 * @param {FormDataEntryValue} params.email - The user's email address.
 * @param {FormDataEntryValue} params.password - The user's password.
 * @param {boolean} params.isVenueManager - Whether the user is registering as a venue manager.
 * @returns {Promise<void>} Resolves when registration is handled (either success or error display).
 * @throws {Error} If the request fails due to network or server issues.
 */

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
