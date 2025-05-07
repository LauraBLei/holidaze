export type StatusMessage = {
  success?: string | null;
  submitError?: string | null;
  validationErrors?: Record<string, string>;
};

export const defaultStatus: StatusMessage = {
  success: null,
  submitError: null,
  validationErrors: {},
};

export const clearStatus = (
  setStatus: React.Dispatch<React.SetStateAction<StatusMessage>>,
  delay = 5000,
) => {
  setTimeout(() => setStatus(defaultStatus), delay);
};

const fieldErrorTimers = new Map<string, ReturnType<typeof setTimeout>>();

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
