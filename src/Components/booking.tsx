import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

interface Booking {
  dateFrom: string;
  dateTo: string;
}

interface BookingFormProps {
  maxGuests: number;
  bookings: Booking[];
  onSubmit: (checkIn: Date, checkOut: Date, guests: number) => void;
}

export const BookingForm = ({ maxGuests, bookings, onSubmit }: BookingFormProps) => {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);

  // Create a list of all blocked date ranges
  const excludeDateIntervals = bookings.map((b) => ({
    start: new Date(b.dateFrom),
    end: new Date(b.dateTo),
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return alert('Select both dates');
    if (checkIn >= checkOut) return alert('Checkout must be after check-in');

    onSubmit(checkIn, checkOut, guests);
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

      <button type="submit" className="button mt-4">
        Book now
      </button>
    </form>
  );
};
