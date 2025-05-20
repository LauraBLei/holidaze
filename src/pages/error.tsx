import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <>
      <h1 className="opacity-0">Error 404</h1>
      <img src="./error.png" alt="Error 404 Image" />
      <Link className="button text-center mt-2" to="/">
        Go back to home!
      </Link>
    </>
  );
};
