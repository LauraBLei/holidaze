import { HandleRegister } from '../../API/auth/register';

export const handleRegisterSubmit = (formdata: FormData) => {
  const password = formdata.get('password');
  const confirmPassword = formdata.get('confirmPassword');
  const name = formdata.get('name');
  const email = formdata.get('email');
  const isVenueManager = formdata.get('isVenueManager') === `true`;

  if (password !== confirmPassword) {
    document.getElementById('passwordError')?.classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('passwordError')?.classList.add('hidden');
    }, 5000);
    return;
  }

  if (name && email && password) {
    HandleRegister({ name, email, password, isVenueManager });
  }
};
