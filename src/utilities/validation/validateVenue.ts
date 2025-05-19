import { scrollToElement } from '../scrollToElement';
import { checkIfEmptyField } from './validateEmptyField';
import { setFieldSuccessMessage, setValidationError, StatusMessage } from './validation';

export function validateVenueName(
  venueName: string,
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
): boolean {
  const isEmpty = checkIfEmptyField('venueName', venueName, setStatus);
  if (isEmpty) {
    scrollToElement('venueName');
    return false;
  }

  if (venueName.length > 50) {
    setValidationError('venueName', 'Venue name needs to be less then 50 characters.', setStatus);
    scrollToElement('venueName');
    return false;
  }

  return true;
}

export function validateDescription(
  description: string,
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
): boolean {
  const isEmpty = checkIfEmptyField('description', description, setStatus);
  if (isEmpty) {
    scrollToElement('description');
    return false;
  }

  if (description.length > 1000) {
    setValidationError(
      'description',
      'Venue description needs to be less then 1000 characters.',
      setStatus,
    );
    scrollToElement('description');
    return false;
  }

  return true;
}

export function validatePrice(
  price: string,
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
): boolean {
  const isEmpty = checkIfEmptyField('price', price, setStatus);
  if (isEmpty) {
    scrollToElement('price');
    return false;
  }

  const numericPrice = Number(price);
  if (isNaN(numericPrice) || numericPrice < 1 || numericPrice > 10000) {
    setValidationError('price', 'Price must be between 1 and 10000', setStatus);
    scrollToElement('price');
    return false;
  }

  return true;
}

export function validateMaxGuests(
  maxGuests: string,
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
): boolean {
  const isEmpty = checkIfEmptyField('maxGuests', maxGuests, setStatus);
  if (isEmpty) {
    scrollToElement('maxGuests');
    return false;
  }

  const numericGuests = Number(maxGuests);
  if (isNaN(numericGuests) || numericGuests < 1 || numericGuests > 100) {
    setValidationError('maxGuests', 'Guests must be between 1 and 100.', setStatus);
    scrollToElement('maxGuests');

    return false;
  }

  return true;
}

export function validateImage(
  imageUrl: string,
  mediaLength: number,
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
): boolean {
  const trimmedUrl = imageUrl.trim();

  if (!trimmedUrl) {
    setValidationError('image', 'Please enter an image URL before adding.', setStatus);
    return false;
  }

  if (trimmedUrl.length > 300) {
    setValidationError('image', 'Image URL cannot be longer than 300 characters.', setStatus);
    scrollToElement('image');

    return false;
  }

  if (mediaLength >= 8) {
    setValidationError('image', 'You can only add up to 8 images.', setStatus);
    scrollToElement('image');
    return false;
  }

  setFieldSuccessMessage(
    'image',
    `Image added. You have added ${mediaLength + 1} images`,
    setStatus,
  );
  return true;
}
