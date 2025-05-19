import React from 'react';

/**
 * Props for the Confirm component.
 * @typedef {Object} ConfirmProps
 * @property {string} message - The message to display in the confirmation dialog.
 * @property {() => void} onConfirm - Callback function executed when the user confirms.
 * @property {() => void} onCancel - Callback function executed when the user cancels.
 */
interface ConfirmProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * A reusable modal confirmation dialog component.
 *
 * Displays a centered dialog overlay with a message and "Cancel" and "Confirm" buttons.
 * Useful for user actions that require explicit confirmation, such as deletions or submissions.
 *
 * @component
 * @param {ConfirmProps} props - Component props.
 * @returns {JSX.Element} The rendered confirmation dialog.
 *
 * @example
 * <Confirm
 *   message="Are you sure you want to delete this?"
 *   onConfirm={handleConfirm}
 *   onCancel={handleCancel}
 * />
 */
export const ConfirmDialog: React.FC<ConfirmProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm text-center space-y-4">
        <p className="text-lg font-semibold">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="bg-white border-2 border-brand-grey  hover:bg-brand-orange hover:border-brand-orange text-black font-medium py-2 px-4 rounded font-primary cursor-pointer scale-95 hover:scale-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-white border-2 border-brand-grey  hover:bg-brand-orange hover:border-brand-orange text-black font-medium py-2 px-4 rounded font-primary cursor-pointer scale-95 hover:scale-100 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
