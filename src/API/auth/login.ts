import { API } from '../endpoints';

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
