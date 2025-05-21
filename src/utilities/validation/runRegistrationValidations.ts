import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from './validateUser';
import { StatusMessage } from './validation';

/**
 * Runs all registration form validations.
 *
 * @param {FormData} formdata - The form data to validate.
 * @param {React.Dispatch<React.SetStateAction<StatusMessage>>} setStatus - State setter for validation status messages.
 * @returns {boolean} True if all validations pass, false otherwise.
 */

export function runRegistrationValidations(
  formdata: FormData,
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
): boolean {
  const name = formdata.get('name')?.toString() || '';
  const email = formdata.get('email')?.toString() || '';
  const password = formdata.get('password')?.toString() || '';
  const confirmPassword = formdata.get('confirmPassword')?.toString() || '';

  const isNameValid = validateName(name, setStatus);
  const isEmailValid = validateEmail(email, setStatus);
  const isPasswordValid = validatePassword(password, setStatus);
  const isConfirmPasswordValid = validateConfirmPassword(password, confirmPassword, setStatus);

  return isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
}
