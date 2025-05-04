import { API } from '../endpoints';
import { headers } from '../headers';

interface BookingPayload {
  checkIn: Date;
  checkOut: Date;
  guests: number;
  venueId: string;
}

export const bookVenue = async ({ checkIn, checkOut, guests, venueId }: BookingPayload) => {
  try {
    const response = await fetch(`${API.BOOKINGS}?_customer=true&_venue=true`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        dateFrom: checkIn.toISOString(),
        dateTo: checkOut.toISOString(),
        guests,
        venueId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Booking failed');
    }

    const data = await response.json();
    console.log('Booking successful:', data);
    return data;
  } catch (error) {
    console.error('Error creating booking:', error);
    alert('Failed to create booking.');
  }
};
