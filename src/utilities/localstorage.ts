export const userInfo = () => {
  const data = localStorage.getItem('User');
  const userInfo = data ? JSON.parse(data) : '';

  return userInfo;
};
