/**
 * Represents the status of a form submission or validation.
 */
export type StatusMessage = {
  /** Success message to display after successful submission */
  success?: string | null;

  /** Error message for failed submission */
  submitError?: string | null;

  /** Field-specific validation errors */
  validationErrors?: Record<string, string>;
};

/**
 * The initial default state of form status.
 * Used to reset success, error, and validation messages.
 */
export const defaultStatus: StatusMessage = {
  success: null,
  submitError: null,
  validationErrors: {},
};

/**
 * Resets the form status (success, error, and validation messages) after a specified delay.
 *
 * @param setStatus - React state setter for the form status.
 * @param delay - Optional time in milliseconds before clearing the status. Defaults to 5000 ms.
 */
export const clearStatus = (
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
  delay = 5000,
) => {
  setTimeout(() => setStatus(defaultStatus), delay);
};

const fieldErrorTimers = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Removes a specific field's validation error from the form status and clears any timeout associated with it.
 *
 * @param field - The name of the form field to clear the error for.
 * @param setStatus - React state setter for the form status.
 */
export const clearFieldError = (
  field: string,
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
) => {
  setStatus((prev) => {
    const newErrors = { ...prev.validationErrors };
    delete newErrors[field];
    return {
      ...prev,
      validationErrors: newErrors,
    };
  });

  if (fieldErrorTimers.has(field)) {
    clearTimeout(fieldErrorTimers.get(field));
    fieldErrorTimers.delete(field);
  }
};

/**
 * Sets a validation error message for a specific form field and automatically clears it after a delay.
 *
 * @param field - The name of the form field to associate the error with.
 * @param message - The validation error message to display.
 * @param setStatus - React state setter for the form status.
 * @param delay - Optional delay (in milliseconds) after which the error will be automatically cleared. Defaults to 5000ms.
 */
export const setValidationError = (
  field: string,
  message: string,
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
  delay = 5000,
) => {
  setStatus((prev) => ({
    ...prev,
    validationErrors: {
      ...prev.validationErrors,
      [field]: message,
    },
  }));

  if (fieldErrorTimers.has(field)) {
    clearTimeout(fieldErrorTimers.get(field));
  }

  const timeout = setTimeout(() => {
    clearFieldError(field, setStatus);
  }, delay);

  fieldErrorTimers.set(field, timeout);
};

/**
 * Sets a submit error message and clears it after a default delay.
 * This function is used when there is a general error during the form submission process.
 *
 * @param message - The error message to display for the submission failure.
 * @param setStatus - React state setter for the form status.
 */
export const setSubmitError = (
  message: string,
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
) => {
  setStatus((prev) => ({
    ...prev,
    submitError: message,
  }));

  clearStatus(setStatus);
};

/**
 * Sets a success message and clears any previous status after a default delay.
 * This function is used when a form submission or action is successful.
 *
 * @param message - The success message to display after the successful submission.
 * @param setStatus - React state setter for the form status.
 */
export const setSuccessMessage = (
  message: string,
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
) => {
  setStatus({
    success: message,
    submitError: null,
    validationErrors: {},
  });

  clearStatus(setStatus);
};
