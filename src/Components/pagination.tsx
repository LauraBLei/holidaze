interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
  totalPages?: number;
}
/**
 * Pagination component for navigating between pages of data.
 *
 * It displays "Previous" and "Next" buttons and the current page number.
 * It supports disabling navigation when at the first or last page,
 * and optionally shows the total number of pages.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.page - The current page number
 * @param {(page: number) => void} props.setPage - Function to update the current page
 * @param {boolean} [props.hasNext=true] - Whether there is a next page
 * @param {boolean} [props.hasPrevious=page > 1] - Whether there is a previous page
 * @param {number} [props.totalPages] - The total number of pages (optional display)
 *
 * @returns {JSX.Element} Pagination UI with previous/next buttons and current page display
 */
export const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  hasNext = true,
  hasPrevious = page > 1,
  totalPages,
}) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-10">
      <button
        onClick={() => setPage(page - 1)}
        disabled={!hasPrevious}
        className=" py-2 max-w-[100px] text-sm md:text-base w-full bg-brand-grey rounded disabled:opacity-50 cursor-pointer scale-95 hover:scale-100 transition"
      >
        Previous
      </button>

      <span className="font-medium text-sm md:text-base text-nowrap text-gray-700">
        Page {page}
        {totalPages && ` of ${totalPages}`}
      </span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={!hasNext}
        className="py-2 max-w-[100px] text-sm md:text-base w-full bg-brand-grey rounded disabled:opacity-50 cursor-pointer scale-95 hover:scale-100 transition"
      >
        Next
      </button>
    </div>
  );
};
