import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { InputType } from '../Types/common';

export const InputField = ({
  id,
  labelText,
  icon,
  onButtonClick,
  textarea,
  ...rest
}: InputType) => (
  <div className="w-full">
    {labelText && id && (
      <label htmlFor={id} className="text-base">
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
