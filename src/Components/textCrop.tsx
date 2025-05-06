import { useState } from 'react';

interface DescriptionProps {
  text: string;
}

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
