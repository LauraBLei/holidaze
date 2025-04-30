import { Venue } from '../../Types/common';
import { API } from '../endpoints';
import { headers } from '../headers';

export const ReadVenues = async (setVenues: (input: Venue[]) => void) => {
  try {
    const response = await fetch(API.VENUES, {
      method: 'GET',
      headers: headers(),
    });
    if (response.ok) {
      const venues = await response.json();

      setVenues(venues.data);
    }
  } catch (error) {
    console.log(error);
  }
};
