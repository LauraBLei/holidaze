import { CreateVenueForm } from '../Components/CreateVenue';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeOutOnlyVariants } from '../Constants/constants';

export const CreatePage = () => {
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
