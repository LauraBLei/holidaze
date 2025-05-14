import { useState } from 'react';

interface DescriptionProps {
  text: string;
}

/**
 * The Description component displays a block of text, truncating it if it's too long.
 * It allows the user to expand or collapse the text by clicking a "See more" or "See less" button.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.text - The text to display, which will be truncated if it exceeds 800 characters.
 *
 * @returns {JSX.Element} The rendered description with a toggle button for long text.
 */

export const Description = ({ text }: DescriptionProps) => {
  const [expanded, setExpanded] = useState(false);
  const limit = 800;

  const isLong = text.length > limit;
  const displayedText = expanded || !isLong ? text : text.slice(0, limit) + '...';

  return (
    <div className="space-y-2">
      <p>{displayedText}</p>
      {isLong && (
        <button
          className="text-black underline text-sm cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'See less' : 'See more'}
        </button>
      )}
    </div>
  );
};
