import { API } from '../endpoints';
import { headers } from '../headers';
/**
 * Sends a booking request for a venue with specified dates and guest count.
 *
 * Converts check-in and check-out dates to UTC ISO strings to avoid timezone issues.
 * Displays appropriate messages for successful booking, date conflict errors (409), or other failures.
 *
 * @param {Object} params - Booking details.
 * @param {Date} params.checkIn - The start date of the booking.
 * @param {Date} params.checkOut - The end date of the booking.
 * @param {number} params.guests - Number of guests for the booking.
 * @param {string} params.venueId - The ID of the venue to book.
 * @returns {Promise<void>} Resolves when the booking request has been processed.
 */

interface BookingPayload {
  checkIn: Date;
  checkOut: Date;
  guests: number;
  venueId: string;
}

const normalizeToUTC = (date: Date) => {
  const normalized = new Date(date);
  normalized.setHours(12, 0, 0, 0); // Set time to noon to avoid timezone issues
  return normalized.toISOString();
};

export const bookVenue = async ({ checkIn, checkOut, guests, venueId }: BookingPayload) => {
  try {
    const response = await fetch(`${API.BOOKINGS}?_customer=true&_venue=true`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        dateFrom: normalizeToUTC(checkIn),
        dateTo: normalizeToUTC(checkOut),
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
