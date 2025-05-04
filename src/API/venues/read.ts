import { Venue } from '../../Types/common';
import { API } from '../endpoints';
import { headers } from '../headers';

export const ReadVenues = async (setVenues: (input: Venue[]) => void) => {
  try {
    const response = await fetch(
      `${API.VENUES}?sort=created&sortOrder=desc&_owner=true&_bookings=true`,
      {
        method: 'GET',
        headers: headers(),
      },
    );
    if (response.ok) {
      const venues = await response.json();

      setVenues(venues.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const ReadVenue = async (id: string, setVenue: (input: Venue) => void) => {
  const queryStrings = '?&_owner=true&_bookings=true';
  try {
    const response = await fetch(API.VENUES + '/' + id + queryStrings, {
      method: 'GET',
      headers: headers(),
    });
    if (response.ok) {
      const venue = await response.json();
      setVenue(venue.data);
    }
  } catch (error) {
    console.log(error);
  }
};
