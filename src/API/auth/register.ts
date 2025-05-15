import { API } from '../endpoints';
import { headers } from '../headers';

type RegisterForm = {
  name: FormDataEntryValue;
  email: FormDataEntryValue;
  password: FormDataEntryValue;
  isVenueManager: boolean;
};
export const fetchRegister = async ({ name, email, password, isVenueManager }: RegisterForm) => {
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
