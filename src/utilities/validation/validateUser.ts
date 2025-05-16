import { checkIfEmptyField } from './validateEmptyField';
import { setValidationError, StatusMessage } from './validation';

/**
 * Validates the username.
 * Checks if the name is empty and matches allowed pattern (letters, numbers, underscores, 1-20 chars).
 * @param {string} name - The username to validate.
 * @param {React.Dispatch<React.SetStateAction<StatusMessage>>} setStatus - Setter for validation status.
 * @returns {boolean} True if valid, false otherwise.
 */
export function validateName(
  name: string,
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
): boolean {
  const isEmpty = checkIfEmptyField('name', name, setStatus);
  if (isEmpty) return false;

  const nameRegex = /^[\w]{1,20}$/;
  if (!nameRegex.test(name)) {
    setValidationError(
      'name',
      'Username can only contain letters, numbers, and underscores.',
      setStatus,
    );
  }

  return true;
}

/**
 * Validates the email address.
 * Checks if email is empty and matches Noroff/stud.noroff domain pattern.
 * @param {string} email - The email to validate.
 * @param {React.Dispatch<React.SetStateAction<StatusMessage>>} setStatus - Setter for validation status.
 * @returns {boolean} True if valid, false otherwise.
 */
export function validateEmail(
  email: string,
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
): boolean {
  const isEmpty = checkIfEmptyField('email', email, setStatus);
  if (isEmpty) return false;

  const emailRegex = /^[\w\-.]+@(stud\.)?noroff\.no$/;
  if (!emailRegex.test(email)) {
    setValidationError(
      'email',
      'Not a valid email address. Must contain @stud.noroff.no or @noroff.no.',
      setStatus,
    );
    return false;
  }

  return true;
}

/**
 * Validates the password.
 * Checks if password is empty and at least 8 characters long.
 * @param {string} password - The password to validate.
 * @param {React.Dispatch<React.SetStateAction<StatusMessage>>} setStatus - Setter for validation status.
 * @returns {boolean} True if valid, false otherwise.
 */
export function validatePassword(
  password: string,
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
): boolean {
  const isEmpty = checkIfEmptyField('password', password, setStatus);
  if (isEmpty) return false;

  if (password.length < 8) {
    setValidationError('password', 'Password needs to be at least 8 characters.', setStatus);
    return false;
  }

  return true;
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string,
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
): boolean {
  const isEmpty = checkIfEmptyField('confirmPassword', confirmPassword, setStatus);
  if (isEmpty) return false;

  if (confirmPassword !== password) {
    setValidationError('confirmPassword', 'Passwords do not match. Please try again', setStatus);
    return false;
  }

  return true;
}

export function validateBio(
  bio: string,
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
): boolean {
  const isEmpty = checkIfEmptyField('bio', bio, setStatus);
  if (isEmpty) return false;

  if (bio.length > 180) {
    setValidationError('bio', 'Max 160 characters', setStatus);
    return false;
  }

  return true;
}
