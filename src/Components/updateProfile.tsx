import React, { useEffect, useRef, useState } from 'react';
import { HandleUpdateProfile } from '../API/profile/updateProfile';
import { storedPFP, storedVenueManager } from '../Constants/constants';

/**
 * The UpdateProfileModal component displays a modal for the user to update their profile information.
 * It includes fields for the user's bio, avatar URL, banner URL, and venue manager status.
 * It also allows the user to close the modal by clicking outside or pressing the Escape key.
 *
 * @param {Object} props - The component's props.
 * @param {boolean} props.isOpen - Whether the modal is currently open.
 * @param {Function} props.onClose - A function to close the modal.
 *
 * @returns {JSX.Element|null} The rendered modal or null if `isOpen` is false.
 */

export const UpdateProfileModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [previewAvatar, setPreviewAvatar] = useState(storedPFP);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 500);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (isValidImageUrl(url)) {
      setPreviewAvatar(url);
    }
  };

  const isValidImageUrl = (url: string) =>
    /\.(jpeg|jpg|gif|png|webp|svg)$/.test(url) && url.startsWith('http');

  if (!isOpen) return null;

  return (
    <section
      onClick={handleClickOutside}
      className={`fixed z-50 bg-black/50 top-0 left-0 h-screen w-screen flex items-center justify-center transition-opacity ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full md:max-w-[750px] max-h-[750px] h-auto py-10 gap-10 px-5 flex flex-col justify-center items-center rounded-xl transition-all duration-500 ease-in-out"
      >
        <div className="w-full flex justify-end px-5">
          <p
            onClick={handleClose}
            className="font-bold font-primary text-2xl hover:scale-100 scale-90 transition cursor-pointer"
          >
            X
          </p>
        </div>
        <h1 className="text-2xl">Update Profile</h1>

        <img
          src={previewAvatar}
          className="rounded-full w-[120px] h-[120px] md:w-[160px] md:h-[160px] object-cover"
          alt="user profile preview"
        />

        <form
          className="w-full flex flex-col gap-4 max-w-[425px] items-center"
          action={HandleUpdateProfile}
        >
          <input type="text" name="bio" placeholder="Bio" className="input" />

          <input
            type="url"
            name="url"
            placeholder="Avatar URL"
            className="input"
            onChange={handleAvatarChange}
          />

          <input type="url" name="banner" placeholder="Banner URL" className="input" />

          {!storedVenueManager && (
            <select required name="venueManager" className="input">
              <option value="true">Venue Manager</option>
              <option value="false">User</option>
            </select>
          )}

          <button type="submit" className="button transition font-bold">
            Update Profile
          </button>
        </form>
      </div>
    </section>
  );
};
