import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="opacity-0">Error 404</h1>
      <div className="max-w-[800px] w-full">
        <img src="./error.png" alt="Error 404 Image" className="" />
      </div>
      <Link className="button text-center mt-5" to="/">
        Go back to home!
      </Link>
    </div>
  );
};
