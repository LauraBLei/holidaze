import { APIVenueData } from '../../Types/common';
import { API } from '../endpoints';
import { headers } from '../headers';

interface readVenuesProps {
  page: number;
  limit: number;
  setAPIData: (input: APIVenueData) => void;
  text: string;
}

export const searchVenues = async ({ page, limit, setAPIData, text }: readVenuesProps) => {
  if (!text) {
    return;
  }
  const params = new URLSearchParams({
    sort: 'created',
    sortOrder: 'desc',
    page: page.toString(),
    limit: limit.toString(),
    q: text,
  });
  try {
    const response = await fetch(API.VENUES_SEARCH + '?' + params, {
      method: 'GET',
      headers: headers(),
    });

    if (response.ok) {
      const venues = await response.json();
      setAPIData(venues);
    }
  } catch (error) {
    console.log(error);
  }
};
