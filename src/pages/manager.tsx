import { useEffect } from 'react';

export const ManagerPage = () => {
  useEffect(() => {
    document.title = 'HAL - Booking Manager';
  }, []);

  return (
    <div>
      <h1>Manage Your Bookings</h1>
      <div>
        <button>Upcoming Guest Bookings</button>
        <button>Past Guest Bookings</button>
      </div>
      <section>
        <h2>Upcoming Guest Bookings</h2>
      </section>
      <section>
        <h3>Past Guest Bookings</h3>
      </section>
    </div>
  );
};
