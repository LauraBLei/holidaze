import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { userInfo } from '../utilities/localstorage';

import { bookVenue } from '../API/booking/book';

interface Booking {
  dateFrom: string;
  dateTo: string;
}

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
    start: new Date(b.dateFrom),
    end: new Date(b.dateTo),
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkIn || !checkOut) return alert('Select both dates');
    if (checkIn >= checkOut) return alert('Checkout must be after check-in');

    const hasConflict = bookings.some((booking) => {
      const existingStart = new Date(booking.dateFrom);
      const existingEnd = new Date(booking.dateTo);

      return checkIn < existingEnd && checkOut > existingStart;
    });
    if (hasConflict) {
      document.getElementById('bookingErrorDates')?.classList.remove('hidden');
      setTimeout(() => {
        document.getElementById('bookingErrorDates')?.classList.add('hidden');
      }, 5000);
      return;
    }

    await bookVenue({ checkIn, checkOut, guests, venueId: id });
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
            excludeDateIntervals={excludeDateIntervals}
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
            excludeDateIntervals={excludeDateIntervals}
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
