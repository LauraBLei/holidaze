import fetchProfile from '../API/profile/fetchProfile';
import LoadingProfilePage from '../Components/loading/LoadingProfilePage';
import { BuildUser } from '../Components/UserProfile';
import React from 'react';

export const ProfilePage = () => {
  const [page, setPage] = React.useState(<LoadingProfilePage />);

  React.useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchProfile();
      if (data) {
        setPage(<BuildUser profile={data} />);
      } else {
        setPage(
          <p className="font-bold text-2xl items-center flex justify-center text-center">
            404. Error loading profile.
          </p>,
        );
      }
    };

    loadProfile();
  }, []);

  return <div className="w-full">{page}</div>;
};
