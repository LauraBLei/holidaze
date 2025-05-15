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

  /** Field-specific success messages*/
  successMessages?: Record<string, string>;
};

/**
 * The initial default state of form status.
 * Used to reset success, error, and validation messages.
 */
export const defaultStatus: StatusMessage = {
  success: null,
  submitError: null,
  validationErrors: {},
  successMessages: {},
};

/**
 * Resets the entire form status (success, submit error, and validation messages)
 * after a specified delay.
 *
 * @param setStatus - React state setter for the form status.
 * @param delay - Time in milliseconds before clearing the status. Defaults to 5000 ms.
 */
export const clearStatus = (
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
  delay = 5000,
) => {
  setTimeout(() => setStatus(defaultStatus), delay);
};

const fieldTimers = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Removes a specific field's message (validation error or success message)
 * from the form status and clears any associated timeout.
 *
 * @param field - The name of the form field whose message will be cleared.
 * @param key - The key of the message type to clear: 'validationErrors' or 'successMessages'.
 * @param setStatus - React state setter for the form status.
 */
export const clearFieldMessage = (
  field: string,
  key: 'validationErrors' | 'successMessages',
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
) => {
  setStatus((prev) => {
    const updated = { ...prev[key] };
    delete updated[field];
    return {
      ...prev,
      [key]: updated,
    };
  });

  if (fieldTimers.has(field)) {
    clearTimeout(fieldTimers.get(field));
    fieldTimers.delete(field);
  }
};

/**
 * Sets a validation error message for a specific form field and
 * automatically clears it after a specified delay.
 *
 * @param field - The name of the form field to associate the error with.
 * @param message - The validation error message to display.
 * @param setStatus - React state setter for the form status.
 * @param delay - Optional delay in milliseconds after which the error will be automatically cleared. Defaults to 5000 ms.
 */
export const setValidationError = (
  field: string,
  message: string,
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
  delay = 5000,
) => {
  clearFieldMessage(field, 'successMessages', setStatus);

  setStatus((prev) => ({
    ...prev,
    validationErrors: {
      ...prev.validationErrors,
      [field]: message,
    },
  }));

  if (fieldTimers.has(field)) {
    clearTimeout(fieldTimers.get(field));
  }

  const timeout = setTimeout(() => {
    clearFieldMessage(field, 'validationErrors', setStatus);
  }, delay);

  fieldTimers.set(field, timeout);
};

/**
 * Sets a general submit error message and clears it after the default delay.
 * Used when a form submission fails due to a global error.
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
 * Sets a general success message and clears any previous status messages
 * after the default delay. Used to indicate successful form submission or action.
 *
 * @param message - The success message to display.
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

/**
 * Sets a success message for a specific form field and clears it after a delay.
 * Useful for giving field-level positive feedback without affecting global status.
 *
 * @param field - The name of the form field to associate the success message with.
 * @param message - The success message to display.
 * @param setStatus - React state setter for the form status.
 * @param delay - Optional delay in milliseconds after which the success message is cleared. Defaults to 3000 ms.
 */
export const setFieldSuccessMessage = (
  field: string,
  message: string,
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
  delay = 5000,
) => {
  clearFieldMessage(field, 'successMessages', setStatus);
  clearFieldMessage(field, 'validationErrors', setStatus);

  setStatus((prev) => ({
    ...prev,
    successMessages: {
      ...prev.successMessages,
      [field]: message,
    },
  }));

  const timeout = setTimeout(() => {
    clearFieldMessage(field, 'successMessages', setStatus);
  }, delay);

  fieldTimers.set(field, timeout);
};
