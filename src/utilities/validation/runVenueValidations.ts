import {
  validateDescription,
  validateMaxGuests,
  validatePrice,
  validateVenueName,
} from './validateVenue';
import { StatusMessage } from './validation';
import { scrollToElement } from '../scrollToElement';

type FieldValidation = {
  field: string;
  isValid: boolean;
};

/**
 * Runs venue form validations and scrolls to the first invalid field.
 *
 * @param formdata - The form data to validate.
 * @param setStatus - State setter for validation status messages.
 * @returns True if all validations pass, false otherwise.
 */
export function runVenueValidations(
  formdata: FormData,
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
): boolean {
  const validations: FieldValidation[] = [
    {
      field: 'venueName',
      isValid: validateVenueName(formdata.get('venueName')?.toString() || '', setStatus),
    },
    {
      field: 'description',
      isValid: validateDescription(formdata.get('description')?.toString() || '', setStatus),
    },
    {
      field: 'price',
      isValid: validatePrice(formdata.get('price')?.toString() || '', setStatus),
    },
    {
      field: 'maxGuests',
      isValid: validateMaxGuests(formdata.get('maxGuests')?.toString() || '', setStatus),
    },
  ];

  const firstInvalid = validations.find((v) => !v.isValid);
  if (firstInvalid) {
    scrollToElement(firstInvalid.field);
    return false;
  }

  return true;
}
