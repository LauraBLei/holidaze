import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { userInfo } from '../utilities/localstorage';

import { Booking } from '../Types/common';
import { handleSubmitBooking } from '../UI/venue/booking';

/**
 * BookingForm component allows users to select check-in and check-out dates,
 * choose the number of guests, and submit the booking for a venue.
 * It validates the booking dates to ensure there are no conflicts with existing bookings.
 *
 * @component
 * @example
 * const bookings = [{ dateFrom: '2025-05-15', dateTo: '2025-05-20' }];
 * return <BookingForm maxGuests={4} bookings={bookings} id="venue123" />;
 *
 * @param {Object} props - Component props.
 * @param {number} props.maxGuests - The maximum number of guests allowed for the venue.
 * @param {Array} props.bookings - A list of existing bookings, with start and end dates.
 * @param {string} props.id - The ID of the venue being booked.
 *
 * @returns {JSX.Element} A form component that allows users to book a venue.
 */
interface BookingFormProps {
  maxGuests: number;
  bookings: Booking[];
  id: string;
}

export const BookingForm = ({ maxGuests, bookings, id }: BookingFormProps) => {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const user = userInfo();

  const excludeDateIntervals = bookings.map((b) => ({
    start: new Date(b.dateFrom).setHours(0, 0, 0, 0),
    end: new Date(b.dateTo).setHours(0, 0, 0, 0),
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await handleSubmitBooking(checkIn, checkOut, guests, id, bookings);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5 items-center">
      <div className="w-full flex flex-col md:flex-row gap-5">
        <label className="input flex flex-col flex-1/2 text-xs">
          CHECK-IN
          <DatePicker
            selected={checkIn}
            onChange={setCheckIn}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            excludeDateIntervals={excludeDateIntervals.map((interval) => ({
              start: new Date(interval.start),
              end: new Date(interval.end),
            }))}
            minDate={new Date()}
            className="text-base"
            placeholderText="Select check-in date"
          />
        </label>

        <label className="input flex flex-col flex-1/2 text-xs">
          CHECK-OUT
          <DatePicker
            selected={checkOut}
            onChange={setCheckOut}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            excludeDateIntervals={excludeDateIntervals.map((interval) => ({
              start: new Date(interval.start),
              end: new Date(interval.end),
            }))}
            minDate={checkIn || new Date()}
            className="text-base"
            placeholderText="Select checkout date"
          />
        </label>
      </div>

      <label className="input flex flex-col text-xs">
        GUESTS
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="text-base"
        >
          {Array.from({ length: maxGuests }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" className={`button mt-4 ${user ? 'block' : 'hidden'} `}>
        Book now
      </button>
    </form>
  );
};
