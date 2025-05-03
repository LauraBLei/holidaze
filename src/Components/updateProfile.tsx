import { HandleUpdateProfile } from '../API/profile/updateProfile';
import { storedPFP, storedVenueManager } from '../Constants/constants';

export const UpdateProfileModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <section className="absolute z-50 bg-black/50 top-0 left-0 h-screen w-screen flex items-center justify-center">
      <div className="bg-white w-full md:max-w-[750px] max-h-[750px] h-auto py-10 gap-10 px-5 flex flex-col justify-center items-center rounded-xl">
        <div className="w-full flex justify-end px-5">
          <p
            onClick={onClose}
            className="font-bold font-primary text-2xl hover:scale-100 scale-90 transition cursor-pointer"
          >
            X
          </p>
        </div>
        <h1 className="text-2xl">Update Profile</h1>
        <img
          src={storedPFP}
          className="rounded-full w-[120px] h-[120px] md:w-[160px] md:h-[160px] object-cover"
          alt="user profile picture"
        />
        <form
          className="w-full flex flex-col gap-4 max-w-[425px] items-center"
          action={HandleUpdateProfile}
        >
          <input type="text" name="bio" placeholder="Bio" className="input" />
          <input type="url" name="url" placeholder="Avatar URL" className="input" />
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
