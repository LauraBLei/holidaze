import { API } from '../endpoints';

/**
 * Handles user login by sending a POST request with email and password.
 *
 * Stores the returned user data in localStorage and reloads the page on success.
 *
 * @param {FormData} formdata - The form data containing 'email' and 'password' fields.
 * @returns {Promise<any>} Resolves with user data if login is successful.
 * @throws {Error} If the login request fails or the response is not OK.
 */

export default async function HandleLogin(formdata: FormData) {
  const body = {
    email: formdata.get('email'),
    password: formdata.get('password'),
  };
  try {
    const response = await fetch(API.AUTH_LOGIN + '?_holidaze=true', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('User', JSON.stringify(data.data));
      window.location.reload();
    }

    return data.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}
