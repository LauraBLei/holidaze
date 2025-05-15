import fetchLogin from '../../API/auth/login';

/**
 * Handles user login form submission by extracting email and password
 * from the FormData and calling the login API.
 *
 * @param {FormData} formdata - The form data containing login credentials.
 * @returns Resolves when login API call is complete.
 */
export const handleLoginSubmit = async (formdata: FormData): Promise<void> => {
  const email = formdata.get('email');
  const password = formdata.get('password');

  if (email && password) {
    await fetchLogin({ email, password });
  }
};
