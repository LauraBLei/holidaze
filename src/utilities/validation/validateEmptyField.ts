import { setValidationError, StatusMessage } from './validation';

/**
 * Checks if a form field value is empty and sets a validation error if so.
 *
 * @param {string} fieldName - The name of the form field.
 * @param {string} fieldValue - The value of the form field to check.
 * @param {React.Dispatch<React.SetStateAction<StatusMessage>>} setStatus - State setter for validation status messages.
 * @returns {boolean} True if the field is empty (validation error set), false otherwise.
 */

export function checkIfEmptyField(
  fieldName: string,
  fieldValue: string,
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
): boolean {
  if (!fieldValue.trim()) {
    setValidationError(fieldName, 'This field cannot be empty, please fill out.', setStatus);
    return true;
  }
  return false;
}
