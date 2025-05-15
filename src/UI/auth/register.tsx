import { fetchRegister } from '../../API/auth/register';

export const handleRegisterSubmit = async (formdata: FormData) => {
  const name = formdata.get('name');
  const email = formdata.get('email');
  const password = formdata.get('password');
  const isVenueManager = formdata.get('isVenueManager') === `true`;

  if (name && email && password) {
    await fetchRegister({ name, email, password, isVenueManager });
  }
};
