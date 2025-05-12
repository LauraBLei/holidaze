import { useContext, useState } from 'react';
import { CommonContext } from '../Types/context';
import { handleRegisterSubmit } from '../UI/auth/register';

export const RegisterModal = () => {
  const [isVenueManager, setIsVenueManager] = useState(false);
  const { OpenLogin, setRegisterOpen } = useContext(CommonContext);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full flex justify-end px-5">
        <p
          onClick={() => setRegisterOpen(false)}
          className="font-bold font-primary text-2xl hover:scale-100 scale-90 transition cursor-pointer"
        >
          X
        </p>
      </div>
      <h1 className="headlineOne mb-16 mt-3">Register an account</h1>
      <form
        className="w-full flex flex-col gap-4 max-w-[425px] items-center"
        onSubmit={(e) => {
          e.preventDefault();
          const formdata = new FormData(e.currentTarget);
          handleRegisterSubmit(formdata);
        }}
      >
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
              className={`flex-1 z-10 py-2 md:py-3.5  font-medium text-base md:text-xl  ${
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
              className={`flex-1 z-10 py-2 md:py-3.5  font-medium text-base md:text-xl whitespace-nowrap ${
                isVenueManager
                  ? 'text-black cursor-auto'
                  : 'text-black whitespace-nowrap cursor-pointer'
              } `}
            >
              Venue Manager
            </button>
          </div>
        </div>
        <div id="error messages" className="w-full">
          <p id="registerSuccess" className="w-full p-3 rounded-xl bg-error-green hidden">
            Your account has been registered!
          </p>
          <p id="passwordError" className="w-full p-3 rounded-xl bg-error-red hidden">
            Passwords does not match
          </p>
          <p id="userExists" className="w-full p-3 rounded-xl bg-error-red hidden">
            Email already exists
          </p>
          <p id="catchError" className="w-full p-3 rounded-xl bg-error-red hidden">
            Something went wrong trying to register, try again later
          </p>
          <p id="wrongEmailPattern" className="w-full p-3 rounded-xl bg-error-red hidden">
            Email must end with @noroff.no / @stud.noroff.no
          </p>
        </div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="input "
          maxLength={20}
        />

        <input type="email" name="email" placeholder="Email" required className="input " />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="input"
          minLength={8}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          className="input"
          minLength={8}
        />

        <button type="submit" className="button transition mt-14">
          Register
        </button>
      </form>
      <button
        className="transition scale-95 hover:scale-100 cursor-pointer mt-4 font-primary"
        onClick={() => OpenLogin()}
      >
        Login
      </button>
    </div>
  );
};
