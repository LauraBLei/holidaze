export const storedUser = localStorage.getItem('User');
export const storedUserData = JSON.parse(storedUser || '{}');
export const accessToken = storedUserData?.accessToken || '';
export const storedName = storedUserData?.name || '';
export const storedBio = storedUserData?.bio || '';
export const storedBanner = storedUserData?.banner?.url || '';
export const storedPFP = storedUserData?.avatar?.url || '';
export const storedVenueManager = storedUserData?.venueManager;

export const fadeOutOnlyVariants = {
  initial: {
    opacity: 1, // Instantly visible when entering
  },
  animate: {
    opacity: 1, // Stay fully visible
  },
  exit: {
    opacity: 0, // Fade out when exiting
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};
