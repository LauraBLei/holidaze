import StarRating from '../components/rating';

export const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <h2>Test commit hook </h2>
      <h2>Test terminal log when commit</h2>
      <div>
        <StarRating rating={5} />
      </div>
    </div>
  );
};
