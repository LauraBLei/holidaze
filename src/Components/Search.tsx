import { SearchIcon } from 'lucide-react';
import React, { JSX, useEffect, useState } from 'react';

interface InputProps {
  setSearchText: (input: string) => void;
  searchText: string;
}

/**
 * Search component with debounced input handling to prevent excessive API calls.
 *
 * @component
 * @param {InputProps} props - Props containing state and setter for search text.
 * @returns {JSX.Element}
 */
export const Search: React.FC<InputProps> = ({
  setSearchText,
  searchText,
}: InputProps): JSX.Element => {
  const [input, setInput] = useState(searchText);

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchText(input);
    }, 500);

    return () => clearTimeout(delay);
  }, [input, setSearchText]);

  return (
    <form
      role="search"
      className="pt-10 mb-5 lg:mb-16 w-full flex justify-center items-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="max-w-[650px] w-full relative">
        <label htmlFor="search" className="sr-only"></label>
        <input
          id="search"
          name="search"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-12 border pl-4 rounded"
          placeholder="Search for venues..."
        />
        <button
          type="submit"
          aria-label="Search"
          className="w-12 h-12 flex items-center justify-center absolute top-0 right-0 cursor-pointer"
        >
          <SearchIcon size={20} />
        </button>
      </div>
    </form>
  );
};
