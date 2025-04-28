import { useState } from 'react';

export const RegisterModal = () => {
  const [isVenueManager, setIsVenueManager] = useState(false);
  return (
    <>
      <section className="w-screen h-screen bg-black/50 flex justify-center items-center">
        <div>
          <h1>Register an account</h1>
          <form action="">
            <div>
              <button
                type="button"
                className={`flex-1 text-center z-10 font-medium py-2 ${
                  !isVenueManager ? 'text-black' : 'text-gray-500'
                }`}
                onClick={() => setIsVenueManager(false)}
              >
                Customer
              </button>
              <button
                type="button"
                className={`flex-1 text-center z-10 font-medium py-2 ${
                  !isVenueManager ? 'text-black' : 'text-gray-500'
                }`}
                onClick={() => setIsVenueManager(true)}
              >
                Venue Manager
              </button>
            </div>
          </form>
          <div id="error messages" className="hidden">
            Error
          </div>
        </div>
      </section>
    </>
  );
};
