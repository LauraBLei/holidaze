import { bookVenue } from '../../API/booking/book';
import { Booking } from '../../Types/common';

export async function handleSubmitBooking(
  checkIn: Date | null,
  checkOut: Date | null,
  guests: number,
  venueId: string,
  bookings: Booking[],
) {
  if (!checkIn || !checkOut) return alert('Select both dates');
  if (checkIn >= checkOut) return alert('Checkout must be after check-in');

  const normalizeDate = (date: Date) => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    return normalizedDate;
  };

  const checkInNormalized = normalizeDate(checkIn);
  const checkOutNormalized = normalizeDate(checkOut);

  const hasConflict = bookings.some((booking) => {
    const existingStart = normalizeDate(new Date(booking.dateFrom));
    const existingEnd = normalizeDate(new Date(booking.dateTo));

    return (
      (checkInNormalized >= existingStart && checkInNormalized < existingEnd) ||
      (checkOutNormalized > existingStart && checkOutNormalized <= existingEnd) ||
      (checkInNormalized < existingStart && checkOutNormalized > existingEnd)
    );
  });

  if (hasConflict) {
    document.getElementById('bookingErrorDates')?.classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('bookingErrorDates')?.classList.add('hidden');
    }, 5000);
    return;
  }

  await bookVenue({ checkIn, checkOut, guests, venueId });
}
