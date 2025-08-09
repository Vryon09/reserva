import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";

function Pagination({
  pages,
  page,
  setPage,
}: {
  pages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  //improve function

  // function generatePages2({ page, pages }: { page: number; pages: number }) {
  //   const pagesArr: number[] = [];
  //   const max = 6;

  //   pagesArr.push(1);

  //   if (pages <= 6) {
  //     for (let i = 2; i <= pages - 1; i++) {
  //       pagesArr.push(i);
  //     }
  //   } else {
  //     if (page <= 3) {
  //       for (let i = 2; i <= max - 1; i++) {
  //         pagesArr.push(i);
  //       }
  //       pagesArr.push(0);
  //     }

  //     if (page > 3) {
  //       if (page - 2 === 2) {
  //         pagesArr.push(page - 2);
  //       } else {
  //         pagesArr.push(0);
  //       }

  //       if (page >= pages - 4) {
  //         for (let i = pages - 4; i <= pages - 1; i++) {
  //           pagesArr.push(i);
  //         }
  //       } else {
  //         pagesArr.push(page - 1);
  //         pagesArr.push(page);
  //         pagesArr.push(page + 1);
  //         if (page + 2 === pages - 1) {
  //           pagesArr.push(page + 2);
  //         } else {
  //           pagesArr.push(0);
  //         }
  //       }
  //     }
  //   }

  //   pagesArr.push(pages);

  //   return pagesArr;
  // }

  function generatePages({ page, pages }: { page: number; pages: number }) {
    const result: number[] = [];
    const ellipsis = 0;

    function addRange(start: number, end: number) {
      for (let i = start; i <= end; i++) {
        result.push(i);
      }
    }

    if (pages < 7) {
      addRange(1, pages);
      return result;
    }

    result.push(1);

    if (page <= 3) {
      addRange(2, 4);
      result.push(ellipsis);
    }

    if (page > 3 && page < pages - 2) {
      result.push(ellipsis);
      addRange(page - 1, page + 1);
      result.push(ellipsis);
    }

    if (page >= pages - 2) {
      result.push(ellipsis);
      addRange(pages - 3, pages - 1);
    }

    if (pages > 1) {
      result.push(pages);
    }

    return result;
  }

  return (
    <div className="mx-auto flex w-fit items-center gap-2">
      {page !== 1 && (
        <button
          className="flex w-8 cursor-pointer justify-center"
          onClick={() => setPage((currPage) => currPage - 1)}
        >
          <ChevronLeft />
        </button>
      )}
      {generatePages({ page, pages }).map((currPage, i) => (
        <Button
          type={page === currPage ? "neutral" : "neutralWhite"}
          disabled={currPage ? false : true}
          onClick={() => setPage(currPage)}
          key={i}
        >
          {currPage ? currPage : "..."}
        </Button>
      ))}
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
