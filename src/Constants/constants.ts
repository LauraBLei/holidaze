export const storedUser = localStorage.getItem('User');
export const storedUserData = JSON.parse(storedUser || '{}');
export const accessToken = storedUserData?.accessToken || '';
export const storedName = storedUserData?.name || '';
export const storedBio = storedUserData?.bio || '';
export const storedBanner = storedUserData?.banner?.url || '';
export const storedPFP = storedUserData?.avatar?.url || '';
export const storedVenueManager = storedUserData?.venueManager;
