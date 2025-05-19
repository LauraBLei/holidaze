import { CreateVenueForm } from '../Components/CreateVenue';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeOutOnlyVariants } from '../Constants/constants';

/**
 * The CreatePage component renders the page where a user can create a new venue.
 * This page contains a title and a form for creating a venue, and it animates in and out using framer-motion.
 *
 * - The page title is dynamically set to "HAL - New Venue".
 * - The `CreateVenueForm` component is rendered within the page, allowing users to submit their venue details.
 *
 * @returns {JSX.Element} The rendered page where users can create a new venue.
 */

const CreatePage = () => {
  useEffect(() => {
    document.title = 'HAL - New Venue';
  }, []);

  return (
    <motion.div
      variants={fadeOutOnlyVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full flex flex-col items-center justify-center"
    >
      <section className="w-full flex flex-col items-center justify-center">
        <h1 className="headlineOne mt-7 md:mt-16">Create your new Venue</h1>
        <CreateVenueForm />
      </section>
    </motion.div>
  );
};

export default CreatePage;
