import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({
  pages,
  page,
  setPage,
}: {
  pages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="mx-auto flex w-fit gap-8">
      {page !== 1 && (
        <button
          className="flex w-8 cursor-pointer justify-center"
          onClick={() => setPage((currPage) => currPage - 1)}
        >
          <ChevronLeft />
        </button>
      )}
      <p className="flex w-8 justify-center">{page}</p>
      {page !== pages && (
        <button
          className="flex w-8 cursor-pointer justify-center"
          onClick={() => setPage((currPage) => currPage + 1)}
        >
          <ChevronRight />
        </button>
      )}
    </div>
  );
}

export default Pagination;
