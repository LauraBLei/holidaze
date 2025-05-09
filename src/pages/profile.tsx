import { useLocation } from 'react-router-dom';
import fetchProfile from '../API/profile/fetchProfile';
import LoadingProfilePage from '../Components/loading/LoadingProfilePage';
import { BuildUser } from '../Components/UserProfile';
import { useEffect, useState } from 'react';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const ProfilePage = () => {
  const query = useQuery();
  const username = query.get('username');

  const [page, setPage] = useState(<LoadingProfilePage />);

  useEffect(() => {
    document.title = `HAL - ${username}`;
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
  }, [username]);

  return <div className="w-full">{page}</div>;
};
