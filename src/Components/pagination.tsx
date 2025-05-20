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
