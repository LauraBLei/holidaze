import { useContext, useState } from 'react';
import { CommonContext } from '../Types/context';
import {
  defaultStatus,
  setSubmitError,
  setSuccessMessage,
  StatusMessage,
} from '../utilities/validation/validation';
import { InputField } from './InputField';
import { runLoginValidations } from '../utilities/validation/runLoginValidations';
import { handleLoginSubmit } from '../UI/auth/login';
import { X } from 'lucide-react';

/**
 * Login modal component for users to sign in to their account.
 *
 * Handles form validation and submission, displaying success or error messages.
 *
 * @param onClose - Function to close the modal.
 * @returns JSX element for the login form modal UI.
 */
export const LoginModal = ({ onClose }: { onClose: () => void }) => {
  const { OpenRegister } = useContext(CommonContext);
  const [formStatus, setFormStatus] = useState<StatusMessage>(defaultStatus);

  /**
   * Handles the form submission event.
   *
   * Prevents default form behavior, validates the form data,
   * submits the form if valid, and updates form status with success or error messages.
   *
   * @param e - The form submission event.
   * @returns Promise<void>
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const isValid = runLoginValidations(formData, setFormStatus);
    if (!isValid) return;

    try {
      await handleLoginSubmit(formData);
      setSuccessMessage('Login successful!', setFormStatus);
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 2000);
    } catch (error) {
      const err = error as Error;
      setSubmitError(err.message, setFormStatus);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full flex justify-end px-5 dark:text-white">
        <p
          onClick={() => {
            onClose();
          }}
          className="font-bold  font-primary text-2xl hover:scale-100 scale-90 transition cursor-pointer"
        >
          <X />
        </p>
      </div>
      <h1 className="text-2xl dark:text-white">Log In</h1>
      <form
        className="w-full flex flex-col gap-4 max-w-[425px] items-center"
        onSubmit={handleSubmit}
      >
        <div id="Slider" className="w-full  mx-auto"></div>

        {formStatus.success && (
          <p className="success-message dark:text-black">{formStatus.success}</p>
        )}
        {formStatus.submitError && <p className="error-message">{formStatus.submitError}</p>}

        <InputField
          id="email"
          name="email"
          labelText="Email"
          labelClass="sr-only"
          type="email"
          placeholder="Email"
        />
        {formStatus.validationErrors?.email && (
          <p className="error-message">{formStatus.validationErrors.email}</p>
        )}

        <InputField
          id="password"
          name="password"
          labelText="Password"
          labelClass="sr-only"
          type="password"
          placeholder="Password"
        />
        {formStatus.validationErrors?.password && (
          <p className="error-message">{formStatus.validationErrors.password}</p>
        )}

        <button type="submit" className="button transition font-bold">
          Login
        </button>
      </form>
      <button
        className="transition scale-95 hover:scale-100 cursor-pointer mt-4 font-primary dark:text-white"
        onClick={() => OpenRegister()}
      >
        Register
      </button>
    </div>
  );
};
