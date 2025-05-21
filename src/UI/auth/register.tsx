import { fetchRegister } from '../../API/auth/register';

/**
 * Handles user registration form submission by extracting necessary fields
 * from the FormData and calling the register API.
 *
 * @param {FormData} formdata - The form data containing registration fields.
 * @returns Resolves when registration API call is complete.
 */
export const handleRegisterSubmit = async (formdata: FormData): Promise<void> => {
  const name = formdata.get('name');
  const email = formdata.get('email');
  const password = formdata.get('password');
  const isVenueManager = formdata.get('isVenueManager') === `true`;

  if (name && email && password) {
    await fetchRegister({ name, email, password, isVenueManager });
  }
};
