import { SearchIcon } from 'lucide-react';
import React, { FormEvent, JSX } from 'react';

interface InputProps {
  setSearchText: (input: string) => void;
  searchText: string;
}

/**
 * Search component that allows users to input a search query.
 *
 * @component
 * @param {InputProps} props - Component props.
 * @returns {JSX.Element} The rendered search input with a search icon.
 */

export const Search: React.FC<InputProps> = ({
  setSearchText,
  searchText,
}: InputProps): JSX.Element => {
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget as HTMLFormElement);
    const searchText = formdata.get('search')?.toString() || '';
    setSearchText(searchText);
  };
  return (
    <form
      role="search"
      className="pt-10 mb-5 lg:mb-16 w-full flex justify-center items-center"
      onSubmit={(e) => {
        handleSearch(e);
      }}
    >
      <div className="max-w-[650px] w-full relative">
        <label htmlFor="search" className="sr-only"></label>
        <input
          id="search"
          name="search"
          type="text"
          value={searchText}
          className=" w-full h-12 border pl-4 rounded"
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
