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
      if (response.status === 409) {
        document.getElementById('bookingErrorDates')?.classList.remove('hidden');
        setTimeout(() => {
          document.getElementById('bookingErrorDates')?.classList.add('hidden');
        }, 8000);
      }
    } else if (response.ok) {
      document.getElementById('bookingSuccess')?.classList.remove('hidden');
      setTimeout(() => {
        document.getElementById('bookingSuccess')?.classList.add('hidden');
      }, 10000);
    }
  } catch {
    document.getElementById('bookingError')?.classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('bookingError')?.classList.add('hidden');
    }, 8000);
  }
};
