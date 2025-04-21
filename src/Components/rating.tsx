import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from 'react-icons/io';

/**
 * Props for the StarRating component.
 *
 * @typedef {Object} StarRatingProps
 * @property {number} rating - A numeric value from 0 to 5 representing the rating.
 *                             Can include half values (e.g., 3.5).
 */
interface StarRatingProps {
  rating: number;
}

/**
 * StarRating is a React functional component that visually represents a star-based rating.
 *
 * It displays up to 5 stars using full, half, and empty star icons from `react-icons`.
 * - Full stars are shown for each whole number in the rating.
 * - A half star is shown if the rating includes a fractional component.
 * - Empty stars fill in the remainder up to 5.
 *
 * Example usage:
 * ```jsx
 * <StarRating rating={3.5} />
 * ```
 *
 * @param {StarRatingProps} props - Component props.
 * @param {number} props.rating - A number representing the rating (e.g., 4.5).
 *
 * @returns {JSX.Element} A flex container with star icons representing the rating.
 */
export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex gap-1 text-black">
      {/* Full Stars */}
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <IoIosStar
            className="w-[18px] md:w-[25px] h-auto"
            key={`full-${i}`}
            fill="currentColor"
            stroke="currentColor"
          />
        ))}

      {/* Half Star */}
      {hasHalfStar && (
        <IoIosStarHalf
          className="w-[18px] md:w-[25px] h-auto"
          key="half"
          fill="currentColor"
          stroke="currentColor"
        />
      )}

      {/* Empty Stars */}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <IoIosStarOutline
            className="w-[18px] md:w-[25px] h-auto"
            key={`empty-${i}`}
            stroke="currentColor"
          />
        ))}
    </div>
  );
};

export default StarRating;
