import fetchProfile from '../API/profile/fetchProfile';
import LoadingProfilePage from '../Components/loading/LoadingProfilePage';
import { BuildUser } from '../Components/UserProfile';

const profile = await fetchProfile();

export const ProfilePage = () => {
  return (
    <div className="w-full">
      {profile ? <BuildUser profile={profile} /> : <LoadingProfilePage />}
    </div>
  );
};
