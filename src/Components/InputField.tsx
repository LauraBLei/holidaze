import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { InputType } from '../Types/common';

/**
 * A reusable input field component that supports both input and textarea elements.
 * It accepts various props including label, icon, and the option to render a textarea instead of an input field.
 * If the icon prop is provided, a button with the icon will be rendered within the input.
 * The button's onClick handler can be customized using the `onButtonClick` prop.
 *
 * @param {string} id - The unique identifier for the input field (required for label association).
 * @param {string} labelText - The text to be displayed in the label of the input field.
 * @param {string} [labelClass] - Optional custom class for the label element.
 * @param {React.ReactNode} [icon] - Optional icon to be displayed inside the input field as a button.
 * @param {() => void} [onButtonClick] - Optional function to handle the button click event when the icon is clicked.
 * @param {boolean} [textarea=false] - Whether to render a textarea element instead of an input field.
 * @param {InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>} rest - All other attributes that are passed to the input or textarea element.
 *
 * @returns {JSX.Element} The rendered input or textarea element with optional label and button.
 */

export const InputField = ({
  id,
  labelText,
  labelClass,
  icon,
  onButtonClick,
  textarea,
  ...rest
}: InputType) => (
  <div className="w-full">
    {labelText && id && (
      <label htmlFor={id} className={labelClass}>
        {labelText}
      </label>
    )}
    <div className="relative mt-1">
      {textarea ? (
        <textarea
          id={id}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className="w-full h-36 border border-brand-grey p-3 rounded-xl focus:outline-brand-grey placeholder:text-sm"
        />
      ) : (
        <input
          id={id}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          className="input focus:border-0 focus:outline-1 focus:outline-brand-grey placeholder:text-sm"
        />
      )}

      {icon && (
        <button
          type="button"
          onClick={onButtonClick}
          className="w-12 p-3 flex items-center justify-center absolute top-0 right-0 bg-brand-orange border border-l-0 rounded-r-xl border-brand-grey cursor-pointer"
        >
          {icon}
        </button>
      )}
    </div>
  </div>
);
