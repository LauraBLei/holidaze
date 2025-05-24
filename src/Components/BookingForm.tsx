import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Booking } from '../Types/common';
import { handleSubmitBooking } from '../UI/venue/booking';
import { storedUserData } from '../Constants/constants';

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
  price: number;
}

export const BookingForm = ({ maxGuests, bookings, id, price }: BookingFormProps) => {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [totalCost, setTotalCost] = useState<number | null>(null);
  const user = storedUserData;

  const excludeDateIntervals = bookings.map((b) => ({
    start: new Date(b.dateFrom).setHours(0, 0, 0, 0),
    end: new Date(b.dateTo).setHours(0, 0, 0, 0),
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await handleSubmitBooking(checkIn, checkOut, guests, id, bookings);
  };

  useEffect(() => {
    if (checkIn && checkOut) {
      const nights = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24);
      if (nights > 0) {
        setTotalCost(nights * price);
      } else {
        setTotalCost(null);
      }
    } else {
      setTotalCost(null);
    }
  }, [checkIn, checkOut, price]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full gap-5 items-center dark:text-white"
    >
      <div className="w-full flex flex-col md:flex-row gap-5">
        <label className="input flex flex-col flex-1/2 text-xs">
          CHECK-IN
          <DatePicker
            id="checkIn"
            name="checkIn"
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
            className="text-base dark:bg-dark dark:text-white"
            placeholderText="Select check-in date"
          />
        </label>

        <label className="input flex flex-col flex-1/2 text-xs">
          CHECK-OUT
          <DatePicker
            id="checkOut"
            name="checkOut"
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
          id="guests"
          name="guests"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="text-base dark:bg-dark"
        >
          {Array.from({ length: maxGuests }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </label>

      {totalCost !== null && (
        <p className="text-base md:text-lg font-bold text-brand-black w-full flex justify-between">
          Total cost:{' '}
          <span className="text-brand-primary">
            {new Intl.NumberFormat('no-NO', {
              style: 'currency',
              currency: 'NOK',
            }).format(totalCost)}
          </span>
        </p>
      )}

      <button type="submit" className={`button mt-4 ${user ? 'block' : 'hidden'} `}>
        Book now
      </button>
    </form>
  );
};
