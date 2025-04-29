import { BiSearch } from 'react-icons/bi';
import React, { JSX } from 'react';

interface InputProps {
  /** The unique identifier for the input field. */
  id: string;

  /** Callback function that receives the user's search query. */
  onSearch: (query: string) => void;
}

/**
 * Search component that allows users to input a search query.
 *
 * @component
 * @param {InputProps} props - Component props.
 * @returns {JSX.Element} The rendered search input with a search icon.
 */

export const Search: React.FC<InputProps> = ({ id, onSearch }: InputProps): JSX.Element => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <form
      role="search"
      className="py-10 w-full flex justify-center items-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="max-w-[650px] w-full relative">
        <label htmlFor="search" className="sr-only"></label>
        <input
          id={id}
          type="text"
          className=" w-full h-12 border pl-4 rounded"
          placeholder="Search for venues..."
          onChange={handleSearch}
        />
        <div className="w-12 h-12 flex items-center justify-center absolute top-0 right-0">
          <BiSearch size={20} />
        </div>
      </div>
    </form>
  );
};
