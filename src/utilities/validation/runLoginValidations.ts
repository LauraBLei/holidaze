import { validateEmail, validatePassword } from './validateUser';
import { StatusMessage } from './validation';

/**
 * Runs login form validations.
 *
 * @param {FormData} formdata - The form data to validate.
 * @param {React.Dispatch<React.SetStateAction<StatusMessage>>} setStatus - State setter for validation status messages.
 * @returns {boolean} True if all validations pass, false otherwise.
 */

export function runLoginValidations(
  formdata: FormData,
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
): boolean {
  const email = formdata.get('email')?.toString() || '';
  const password = formdata.get('password')?.toString() || '';

  const isEmailValid = validateEmail(email, setStatus);
  const isPasswordValid = validatePassword(password, setStatus);

  return isEmailValid && isPasswordValid;
}
