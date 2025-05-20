interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
  totalPages?: number;
}

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
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span className="font-medium text-gray-700">
        Page {page}
        {totalPages && ` of ${totalPages}`}
      </span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={!hasNext}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
