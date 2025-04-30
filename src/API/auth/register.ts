import { API } from '../endpoints';
import { headers } from '../headers';

type RegisterForm = {
  name: FormDataEntryValue;
  email: FormDataEntryValue;
  password: FormDataEntryValue;
  isVenueManager: boolean;
};
export const HandleRegister = async ({ name, email, password, isVenueManager }: RegisterForm) => {
  const body = {
    name,
    email,
    password,
    venueManager: isVenueManager,
  };
  try {
    const response = await fetch(API.AUTH_REGISTER, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (response.status === 400 && errorData.errors[0]?.message === 'Profile already exists') {
        document.getElementById('userExists')?.classList.remove('hidden');
        setTimeout(() => {
          document.getElementById('userExists')?.classList.add('hidden');
        }, 5000);
        return;
      }
    }

    if (response.ok) {
      document.getElementById('registerSuccess')?.classList.remove('hidden');
      setTimeout(() => {
        document.getElementById('registerSuccess')?.classList.add('hidden');
      }, 5000);
    }
  } catch (error) {
    document.getElementById('catchError')?.classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('catchError')?.classList.add('hidden');
    }, 5000);
    throw error;
  }
};
