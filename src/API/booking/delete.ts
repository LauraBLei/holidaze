import { API } from '../endpoints';
import { headers } from '../headers';

export const deleteBooking = async (id: string) => {
  try {
    const response = await fetch(`${API.BOOKINGS}/${id}`, {
      method: 'DELETE',
      headers: headers(),
    });

    if (response.ok) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
