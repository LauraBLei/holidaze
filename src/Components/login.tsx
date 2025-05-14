import { useContext } from 'react';
import { CommonContext } from '../Types/context';
import HandleLogin from '../API/auth/login';

/**
 * The LoginModal component displays a modal window where users can log in to their account.
 * It includes email and password input fields and a login button.
 * A button for navigating to the registration page is also provided.
 * The modal can be closed by calling the `onClose` function passed as a prop.
 *
 * @param {Object} props - The component's props.
 * @param {Function} props.onClose - A function that handles closing the modal.
 *
 * @returns {JSX.Element} The rendered login modal.
 */

export const LoginModal = ({ onClose }: { onClose: () => void }) => {
  const { OpenRegister } = useContext(CommonContext);
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full flex justify-end px-5 ">
        <p
          onClick={() => {
            onClose();
          }}
          className="font-bold  font-primary text-2xl hover:scale-100 scale-90 transition cursor-pointer"
        >
          X
        </p>
      </div>
      <h1 className="text-2xl">Log In</h1>
      <form className="w-full flex flex-col gap-4 max-w-[425px] items-center" action={HandleLogin}>
        <div id="Slider" className="w-full  mx-auto"></div>
        <div id="error messages" className="hidden">
          <span>Login Successful</span>
        </div>

        <input type="email" name="email" placeholder="Email" required className="input " />

        <input type="password" name="password" placeholder="Password" required className="input" />

        <button type="submit" className="button transition font-bold">
          Login
        </button>
      </form>
      <button
        className="transition scale-95 hover:scale-100 cursor-pointer mt-4 font-primary"
        onClick={() => OpenRegister()}
      >
        Register
      </button>
    </div>
  );
};
