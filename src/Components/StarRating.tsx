import { Star } from 'lucide-react';

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
 * It displays up to 5 stars using icons from the `lucide-react` library.
 * - Full stars are rendered for each whole number in the rating.
 * - A half star is simulated using a clipped full star layered over an outlined star.
 * - Empty stars are shown using unfilled `Star` icons.
 *
 * The half star is visually represented using CSS `clipPath` to fill only half of a star.
 *
 * Example usage:
 * ```tsx
 * <StarRating rating={3.5} />
 * ```
 *
 * @param {StarRatingProps} props - Component props.
 * @param {number} props.rating - A number from 0 to 5, possibly including halves (e.g., 4.5).
 *
 * @returns {JSX.Element} A flex container with star icons indicating the given rating.
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
          <Star
            className="w-[18px] md:w-[25px] h-auto"
            key={`full-${i}`}
            fill="currentColor"
            stroke="currentColor"
          />
        ))}

      {/* Half Star (simulated) */}
      {hasHalfStar && (
        <div className="relative">
          <Star
            key="half"
            className="absolute top-0 left-0 w-[18px] md:w-[25px] h-auto"
            fill="currentColor"
            stroke="currentColor"
            style={{ clipPath: 'inset(0 50% 0 0)' }} // Half-filled
          />
          <Star
            className="absolute top-0 left-0 w-[18px] md:w-[25px] h-auto"
            stroke="currentColor"
          />
        </div>
      )}

      {/* Empty Stars */}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <Star className="w-[18px] md:w-[25px] h-auto" key={`empty-${i}`} stroke="currentColor" />
        ))}
    </div>
  );
};

export default StarRating;
