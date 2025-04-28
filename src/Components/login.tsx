import { useContext } from 'react';
import { CommonContext } from '../Types/context';
import HandleLogin from '../API/auth/login';

export const LoginModal = () => {
  const { loginOpen, OpenRegister } = useContext(CommonContext);
  return (
    <section
      className={`absolute z-50 bg-black/50 h-screen w-full flex items-center justify-center ${loginOpen ? 'block' : 'hidden'}`}
    >
      <div className="bg-white w-full md:max-w-[750px] max-h-[750px] h-full flex flex-col justify-center items-center rounded-xl">
        <h1 className="text-2xl">Log In</h1>
        <form
          className="w-full flex flex-col gap-4 max-w-[425px] items-center"
          action={HandleLogin}
        >
          <div id="Slider" className="w-full  mx-auto"></div>
          <div id="error messages" className="hidden">
            <span>Login Successful</span>
          </div>

          <input type="email" name="email" placeholder="Email" required className="input " />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="input"
          />

          <button type="submit" className="button transition font-bold">
            Login
          </button>
        </form>
        <button
          className="transition scale-95 hover:scale-100 cursor-pointer"
          onClick={() => OpenRegister()}
        >
          Register
        </button>
      </div>
    </section>
  );
};
