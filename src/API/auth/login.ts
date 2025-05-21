import { API } from '../endpoints';

type LoginForm = {
  email: FormDataEntryValue;
  password: FormDataEntryValue;
};

/**
 * Sends a login request to the API.
 *
 * @param {Object} params - Login credentials.
 * @param {FormDataEntryValue} params.email - User's email address.
 * @param {FormDataEntryValue} params.password - User's password.
 * @returns {Promise<Object>} Resolves with user data on successful login.
 * @throws {Error} Throws an error if the API response is not ok.
 */
export const fetchLogin = async ({ email, password }: LoginForm): Promise<object> => {
  const body = {
    email,
    password,
  };

  const response = await fetch(API.AUTH_LOGIN + '?_holidaze=true', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    const message =
      data?.errors?.[0]?.message || data?.message || 'Failed to login. Please try again';
    throw new Error(message);
  }

  localStorage.setItem('User', JSON.stringify(data.data));

  return data.data;
};
