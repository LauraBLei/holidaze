import { CreateVenueForm } from '../Components/CreateVenue';
import { useEffect } from 'react';

export const CreatePage = () => {
  useEffect(() => {
    document.title = 'HAL - New Venue';
  }, []);

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <h1 className="headlineOne mt-7 md:mt-16">Create your new Venue</h1>
      <CreateVenueForm />
    </section>
  );
};
