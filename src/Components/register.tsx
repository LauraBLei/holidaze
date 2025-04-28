import { useContext, useState } from 'react';
import { CommonContext } from '../Types/context';

export const RegisterModal = () => {
  const [isVenueManager, setIsVenueManager] = useState(false);
  const { registerOpen, OpenLogin } = useContext(CommonContext);
  return (
    <>
      <section className={`absolute z-50 ${registerOpen ? 'block' : 'hidden'}`}>
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
        <button onClick={() => OpenLogin()}>Login</button>
      </section>
    </>
  );
};
