import { bookVenue } from '../../API/booking/book';
import { Booking } from '../../Types/common';

/**
 * Handles the submission of the booking form.
 *
 * @param {Date | null} checkIn - The selected check-in date.
 * @param {Date | null} checkOut - The selected check-out date.
 * @param {number} guests - The number of guests for the booking.
 * @param {string} venueId - The ID of the venue being booked.
 * @param {Booking[]} bookings - Existing bookings to check for conflicts.
 * @returns {Promise<void>} - A promise that resolves when the booking is submitted.
 */
export async function handleSubmitBooking(
  checkIn: Date | null,
  checkOut: Date | null,
  guests: number,
  venueId: string,
  bookings: Booking[],
) {
  if (!checkIn || !checkOut) return alert('Select both dates');
  if (checkIn >= checkOut) return alert('Checkout must be after check-in');

  // Check if the selected booking dates conflict with any existing bookings
  const hasConflict = bookings.some((booking) => {
    const existingStart = new Date(booking.dateFrom);
    const existingEnd = new Date(booking.dateTo);

    // Check for conflicts
    return (
      (checkIn >= existingStart && checkIn <= existingEnd) || // checkIn is within an existing booking
      (checkOut >= existingStart && checkOut <= existingEnd) || // checkOut is within an existing booking
      (checkIn <= existingStart && checkOut >= existingEnd) // The new booking fully overlaps with an existing one
    );
  });

  if (hasConflict) {
    document.getElementById('bookingErrorDates')?.classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('bookingErrorDates')?.classList.add('hidden');
    }, 5000);
    return;
  }

  // Proceed with booking if no conflict
  await bookVenue({ checkIn, checkOut, guests, venueId });
}
