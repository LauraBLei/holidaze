import { useContext, useState } from 'react';
import { CommonContext } from '../Types/context';

export const RegisterModal = () => {
  const [isVenueManager, setIsVenueManager] = useState(false);
  const { registerOpen, OpenLogin } = useContext(CommonContext);
  return (
    <>
      <section
        className={`absolute z-50 bg-black/50 h-screen w-full flex items-center justify-center ${registerOpen ? 'block' : 'hidden'}`}
      >
        <div className="bg-white w-full md:max-w-[750px] max-h-[750px] h-full flex flex-col justify-center items-center rounded-xl">
          <h1 className="">Register an account</h1>
          <form className="w-full flex flex-col gap-4 max-w-[425px] items-center" action="">
            <div id="Slider" className="w-full  mx-auto">
              <input type="hidden" name="isVenueManager" value={isVenueManager.toString()} />

              <div className="relative flex rounded-full  justify-between  w-full">
                <div
                  id="movingSlider"
                  className={`absolute top-0 left-0 w-1/2 h-full rounded-xl  bg-brand-orange shadow-md transition ${
                    isVenueManager ? 'translate-x-full' : ''
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setIsVenueManager(false)}
                  className={`flex-1 z-10 py-3.5  font-medium text-xl  ${
                    !isVenueManager
                      ? 'text-black cursor-auto'
                      : 'text-black whitespace-nowrap cursor-pointer'
                  }`}
                >
                  Customer
                </button>

                {/* Venue Manager button */}
                <button
                  type="button"
                  onClick={() => setIsVenueManager(true)}
                  className={`flex-1 z-10 py-3.5  font-medium text-xl text-black whitespace-nowrap ${
                    isVenueManager
                      ? 'text-black cursor-auto'
                      : 'text-black whitespace-nowrap cursor-pointer'
                  } `}
                >
                  Venue Manager
                </button>
              </div>
            </div>
            <div id="error messages" className="hidden">
              <span>Register Successful</span>
            </div>
            <input type="text" name="name" placeholder="Name" required className="input " />

            <input type="email" name="email" placeholder="Email" required className="input " />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="input"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              className="input"
            />

            <button type="submit" className="button transition ">
              Register
            </button>
          </form>
        </div>
        <button onClick={() => OpenLogin()}>Login</button>
      </section>
    </>
  );
};
