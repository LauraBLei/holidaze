import { JSX, useContext, useState } from 'react';
import { CommonContext } from '../Types/context';
import { handleRegisterSubmit } from '../UI/auth/register';
import {
  defaultStatus,
  setSubmitError,
  setSuccessMessage,
  StatusMessage,
} from '../utilities/validation/validation';
import { runRegistrationValidations } from '../utilities/validation/runRegistrationValidations';
import { InputField } from './InputField';

/**
 * Registration modal component for users to create a new account.
 *
 * Allows toggling between customer and venue manager roles,
 * handles form validation and submission, and shows success/error messages.
 *
 * @param onClose - Function to close the modal.
 * @returns JSX element for the registration form modal UI.
 */
export const RegisterModal = ({ onClose }: { onClose: () => void }): JSX.Element => {
  const [isVenueManager, setIsVenueManager] = useState(false);
  const { OpenLogin } = useContext(CommonContext);

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

    const isValid = runRegistrationValidations(formData, setFormStatus);
    console.log('Validation result:', isValid);
    if (!isValid) return;

    try {
      await handleRegisterSubmit(formData);
      setSuccessMessage('Registration successful!', setFormStatus);
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
      <div className="w-full flex justify-end px-5">
        <p
          onClick={() => {
            onClose();
          }}
          className="font-bold font-primary text-2xl hover:scale-100 scale-90 transition cursor-pointer"
        >
          X
        </p>
      </div>
      <h1 className="headlineOne mb-16 mt-3">Register an account</h1>
      <form
        className="w-full flex flex-col gap-4 max-w-[425px] items-center"
        onSubmit={handleSubmit}
      >
        <div id="Slider" className="w-full  mx-auto">
          <input type="hidden" name="isVenueManager" value={isVenueManager.toString()} />

          <div className="relative flex rounded-full  justify-between  w-full">
            <div
              id="movingSlider"
              className={`absolute top-0 left-0 w-1/2 h-full rounded-xl  bg-brand-orange shadow-md transition ${
                isVenueManager ? 'translate-x-full' : ''
              }`}
            />

            <button
              type="button"
              onClick={() => setIsVenueManager(false)}
              className={`flex-1 z-10 py-2 md:py-3.5  font-medium text-base md:text-xl  ${
                !isVenueManager
                  ? 'text-black cursor-auto'
                  : 'text-black whitespace-nowrap cursor-pointer'
              }`}
            >
              Customer
            </button>

            {/* Venue Manager button */}
            <button
              type="button"
              onClick={() => setIsVenueManager(true)}
              className={`flex-1 z-10 py-2 md:py-3.5  font-medium text-base md:text-xl whitespace-nowrap ${
                isVenueManager
                  ? 'text-black cursor-auto'
                  : 'text-black whitespace-nowrap cursor-pointer'
              } `}
            >
              Venue Manager
            </button>
          </div>
        </div>

        {formStatus.success && <p className="success-message">{formStatus.success}</p>}
        {formStatus.submitError && <p className="error-message">{formStatus.submitError}</p>}

        <InputField
          id="name"
          name="name"
          labelText="Name"
          labelClass="sr-only"
          type="text"
          placeholder="Name"
          className="input"
        />
        {formStatus.validationErrors?.name && (
          <p className="error-message">{formStatus.validationErrors.name}</p>
        )}

        <InputField
          id="email"
          name="email"
          labelText="Email"
          labelClass="sr-only"
          type="email"
          placeholder="Email"
          className="input"
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

        <InputField
          id="confirmPassword"
          name="confirmPassword"
          labelText="Confirm Password"
          labelClass="sr-only"
          type="password"
          placeholder="Confirm Password"
        />
        {formStatus.validationErrors?.confirmPassword && (
          <p className="error-message">{formStatus.validationErrors.confirmPassword}</p>
        )}

        <button type="submit" className="button transition mt-14">
          Register
        </button>
      </form>
      <button
        className="transition scale-95 hover:scale-100 cursor-pointer mt-4 font-primary"
        onClick={() => OpenLogin()}
      >
        Login
      </button>
    </div>
  );
};
