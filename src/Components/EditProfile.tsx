import React, { useEffect, useRef, useState } from 'react';
import { HandleUpdateProfile } from '../API/profile/updateProfile';
import { storedAvatar, storedVenueManager } from '../Constants/constants';
import { InputField } from './InputField';
import { Profile } from '../Types/common';

interface EditProfileProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

/**
 * EditProfile component renders a modal for editing a user's profile.
 * It allows updating bio, avatar URL, banner image, and optionally toggling the venue manager status.
 *
 * Features:
 * - Avatar preview with validation
 * - ESC key and click-outside support for closing the modal
 * - Animated open/close transitions
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is currently open
 * @param {() => void} props.onClose - Function to call when closing the modal
 * @param {Profile} props.profile - The current user profile data
 *
 * @returns {JSX.Element | null} The EditProfile modal or null if closed
 */
export const EditProfile = ({ isOpen, onClose, profile }: EditProfileProps) => {
  const [previewAvatar, setPreviewAvatar] = useState(storedAvatar);
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(false);
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  });

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
    setPreviewAvatar(profile.avatar.url);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value.trim();

    if (url === '') {
      document.getElementById('invalidAvatarUrl')?.classList.add('hidden');
      return;
    }

    if (isValidImageUrl(url)) {
      setPreviewAvatar(url);
      document.getElementById('invalidAvatarUrl')?.classList.add('hidden');
    } else {
      document.getElementById('invalidAvatarUrl')?.classList.remove('hidden');

      setTimeout(() => {
        setPreviewAvatar(profile.avatar.url);
        e.target.value = '';
        document.getElementById('invalidAvatarUrl')?.classList.add('hidden');
      }, 3000);
    }
  };

  const isValidImageUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      const hasImageExtension = /\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/.test(parsed.pathname);
      const looksLikeUnsplash = parsed.hostname.includes('unsplash.com');
      return hasImageExtension || looksLikeUnsplash;
    } catch {
      return false;
    }
  };

  if (!isOpen && !isClosing) return null;

  return (
    <section
      onClick={handleClickOutside}
      className={`fixed z-50 bg-black/50 top-0 left-0 h-screen w-screen flex items-center justify-center
        transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full md:max-w-[750px] max-h-[750px] h-auto py-10 gap-10 px-5 flex flex-col justify-center items-center
          rounded-xl transition-all duration-500 ease-in-out transform ${isVisible ? 'scale-100' : 'scale-95'}`}
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
          <InputField
            id="bio"
            type="text"
            name="bio"
            placeholder="Bio"
            className="input"
            labelText="Bio"
            labelClass="sr-only"
          />

          <InputField
            id="avatar"
            type="url"
            name="avatar"
            placeholder="Avatar URL"
            className="input"
            onChange={handleAvatarChange}
            labelText="Avatar url"
            labelClass="sr-only"
          />
          <p id="invalidAvatarUrl" className="error-message hidden">
            url not valid!
          </p>
          <InputField
            id="banner"
            type="url"
            name="banner"
            placeholder="Banner URL"
            className="input"
            labelText="Banner url"
            labelClass="sr-only"
          />

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
