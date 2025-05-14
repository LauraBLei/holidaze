import { HandleRegister } from '../../API/auth/register';

/**
 * Handles the form submission for user registration.
 *
 * Validates the email format and checks if the password and confirm password fields match.
 * If the validation passes, it calls the `HandleRegister` function to register the user.
 *
 * Displays error messages if the email pattern is invalid or if passwords do not match.
 * Error messages are hidden after 5 seconds.
 *
 * @param {FormData} formdata - The form data object containing the registration fields.
 * @param {string} formdata.name - The name of the user to register.
 * @param {string} formdata.email - The email address of the user to register.
 * @param {string} formdata.password - The password the user wants to set.
 * @param {string} formdata.confirmPassword - The confirmation password for verification.
 * @param {boolean} formdata.isVenueManager - Flag indicating if the user is a venue manager.
 *
 * @returns {void} Nothing is returned. The function performs form validation and registration logic.
 */
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
