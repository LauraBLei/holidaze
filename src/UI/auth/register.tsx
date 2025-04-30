import { HandleRegister } from '../../API/auth/register';

export const handleRegisterSubmit = (formdata: FormData) => {
  const password = formdata.get('password');
  const confirmPassword = formdata.get('confirmPassword');
  const name = formdata.get('name');
  const email = formdata.get('email');
  const isVenueManager = formdata.get('isVenueManager') === `true`;
  const emailPattern = /^[\w\-.]+@(stud\.)?noroff\.no$/;

  const emailString = email?.toString() || '';
  if (!emailPattern.test(emailString)) {
    document.getElementById('wrongEmailPattern')?.classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('wrongEmailPattern')?.classList.add('hidden');
    }, 5000);
    return;
  }

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
