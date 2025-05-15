/**
 * Retrieves the user information from localStorage.
 *
 * This function attempts to get the user data stored under the key 'User' in the localStorage.
 * If the data exists and is successfully parsed, it returns the user information object.
 * If the data does not exist or cannot be parsed, it returns an empty string.
 *
 * @returns {object|string} The parsed user information object if available, or an empty string if no data exists in localStorage.
 */
export const userInfo = () => {
  const data = localStorage.getItem('User');
  const userInfo = data ? JSON.parse(data) : '';

  return userInfo;
};
