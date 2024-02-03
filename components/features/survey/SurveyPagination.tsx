"use client";

//redux
import { useDispatch } from "react-redux";
import { paginationActions } from "@/store/slices/paginationSlice";
import { UseDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
//pagination
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const SurveyPagination = () => {
  const dispatch = useDispatch();

  const page = useSelector((state: RootState) => state.pagination.page);

  return (
    <Pagination className="text-white">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => dispatch(paginationActions.prevPage())}
            className={`p-regular-16 lg:p-regular-20 hover:cursor-pointer ${
              page <= 1 ? "pointer-events-none opacity-50" : ""
            }`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => dispatch(paginationActions.nextPage())}
            className={`p-regular-16 lg:p-regular-20 hover:cursor-pointer ${
              page >= 3 ? "pointer-events-none opacity-50" : ""
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default SurveyPagination;
