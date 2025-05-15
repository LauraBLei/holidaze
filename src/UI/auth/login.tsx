import fetchLogin from '../../API/auth/login';

export const handleLoginSubmit = async (formdata: FormData) => {
  const email = formdata.get('email');
  const password = formdata.get('password');

  if (email && password) {
    await fetchLogin({ email, password });
  }
};
