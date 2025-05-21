import { useLocation, useNavigate } from 'react-router-dom';
import fetchProfile from '../API/profile/fetchProfile';
import { BuildUser } from '../Components/UserProfile';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeOutOnlyVariants } from '../Constants/constants';
import SkeletonLoaderProfile from '../Components/loading/SkeletonLoaderProfile';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

/**
 * The ProfilePage component fetches and displays a user's profile based on the `username` query parameter
 * from the URL. It loads the user's profile data asynchronously and displays either the profile details or
 * an error message if the profile cannot be loaded.
 *
 * - Extracts the `username` query parameter from the URL using `useLocation`.
 * - Displays a loading state while fetching the user's profile.
 * - Once the profile data is fetched, it renders the `BuildUser` component with the profile data.
 * - If an error occurs while fetching the profile, a 404 error message is displayed.
 *
 * @returns {JSX.Element} The rendered profile page with the user's profile information or an error message.
 */

const ProfilePage = () => {
  const query = useQuery();
  const username = query.get('username');
  const navigate = useNavigate();

  const [page, setPage] = useState(<SkeletonLoaderProfile />);

  useEffect(() => {
    document.title = `HAL - ${username}`;
    const loadProfile = async () => {
      const data = await fetchProfile();

      if (data) {
        setPage(<BuildUser profile={data} />);
      } else {
        navigate('/error');
      }
    };

    loadProfile();
  }, [username]);

  return (
    <motion.div
      variants={fadeOutOnlyVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      {page}
    </motion.div>
  );
};

export default ProfilePage;
