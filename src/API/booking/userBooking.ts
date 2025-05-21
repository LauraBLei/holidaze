import { APIBookingData } from '../../Types/common';
import { API } from '../endpoints';
import { headers, storedUserData } from '../headers';

interface readUserBookingsProps {
  page: number;
  limit: number;

  setAPIData: (input: APIBookingData) => void;
}

export const readUserBookings = async ({ page, limit, setAPIData }: readUserBookingsProps) => {
  const params = new URLSearchParams({
    sort: 'created',
    sortOrder: 'desc',
    page: page.toString(),
    limit: limit.toString(),
    _venue: 'true',
  });
  const user = storedUserData;

  try {
    const response = await fetch(`${API.PROFILES}/${user.name}/bookings?${params.toString()}`, {
      method: 'GET',
      headers: headers(),
    });
    if (response.ok) {
      const bookings = await response.json();
      setAPIData(bookings);
    }
  } catch (error) {
    console.log(error);
  }
};
