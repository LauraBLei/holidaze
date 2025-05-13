import { setValidationError, StatusMessage } from './validation';

type SetFormStatus = React.Dispatch<React.SetStateAction<StatusMessage>>;

/**
 * Validates the venue form fields.
 * Checks that required fields are filled and numeric values are within allowed ranges.
 *
 * @param formdata - FormData object from the submitted form
 * @param setFormStatus - State setter to update validation errors
 * @returns True if form is valid, false otherwise
 */

export function validateForm(formdata: FormData, setFormStatus: SetFormStatus): boolean {
  const name = formdata.get('name')?.toString() || '';
  const description = formdata.get('description')?.toString() || '';
  const price = Number(formdata.get('price'));
  const maxGuests = Number(formdata.get('maxGuests'));

  if (name === '') {
    setValidationError('name', 'Please enter a venue name', setFormStatus);
    scrollToField('name');
    return false;
  }

  if (description === '') {
    setValidationError('description', 'Please enter a description', setFormStatus);
    scrollToField('description');
    return false;
  }

  if (price < 1 || price > 10000) {
    setValidationError('price', 'Price must be between 1 and 10000.', setFormStatus);
    scrollToField('price');
    return false;
  }

  if (maxGuests < 1 || maxGuests > 100) {
    setValidationError('maxGuests', 'Guests must be between 1 and 100.', setFormStatus);
    scrollToField('maxGuests');
    return false;
  }

  return true;
}

/**
 * Smoothly scrolls to a form field and focuses it.
 *
 * @param fieldId - The HTML id of the field to scroll to
 */

function scrollToField(fieldId: string) {
  const field = document.getElementById(fieldId);
  if (field) {
    field.scrollIntoView({ behavior: 'smooth', block: 'center' });
    (field as HTMLElement).focus();
  }
}
