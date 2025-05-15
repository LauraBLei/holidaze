import { setValidationError, StatusMessage } from './validation';

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
