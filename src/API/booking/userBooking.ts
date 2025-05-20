import { Booking } from '../../Types/common';
import { userInfo } from '../../utilities/localstorage';
import { API } from '../endpoints';
import { headers } from '../headers';

interface readUserBookingsProps {
  page: number;
  limit: number;
  setBookings: (input: Booking[]) => void;
  setTotalCount: (input: number) => void;
}

export const readUserBookings = async ({
  page,
  limit,
  setBookings,
  setTotalCount,
}: readUserBookingsProps) => {
  const params = new URLSearchParams({
    sort: 'created',
    sortOrder: 'desc',
    page: page.toString(),
    limit: limit.toString(),
    _venue: 'true',
  });
  const user = userInfo();

  try {
    const response = await fetch(`${API.PROFILES}/${user.name}/bookings?${params.toString()}`, {
      method: 'GET',
      headers: headers(),
    });
    if (response.ok) {
      const bookings = await response.json();
      console.log('API:', bookings);

      setBookings(bookings.data);
      setTotalCount(bookings.meta.totalCount);
    }
  } catch (error) {
    console.log(error);
  }
};
