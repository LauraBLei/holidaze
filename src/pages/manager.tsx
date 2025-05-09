import { useEffect } from 'react';

export const ManagerPage = () => {
  useEffect(() => {
    document.title = 'HAL - Booking Manager';
  }, []);

  return (
    <div>
      <h1>Manage your venues</h1>
    </div>
  );
};
